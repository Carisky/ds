param(
  [Parameter(Mandatory = $true)]
  [string]$Shortcut
)

Add-Type -AssemblyName System.Windows.Forms

$source = @"
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Windows.Forms;

public sealed class ModifierOnlyHotkeyContext : ApplicationContext
{
    private const int WH_KEYBOARD_LL = 13;
    private const int WM_KEYDOWN = 0x0100;
    private const int WM_KEYUP = 0x0101;
    private const int WM_SYSKEYDOWN = 0x0104;
    private const int WM_SYSKEYUP = 0x0105;
    private const int VK_SHIFT = 0x10;
    private const int VK_CONTROL = 0x11;
    private const int VK_MENU = 0x12;
    private const int VK_LSHIFT = 0xA0;
    private const int VK_RSHIFT = 0xA1;
    private const int VK_LCONTROL = 0xA2;
    private const int VK_RCONTROL = 0xA3;
    private const int VK_LMENU = 0xA4;
    private const int VK_RMENU = 0xA5;
    private const int VK_LWIN = 0x5B;
    private const int VK_RWIN = 0x5C;

    private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

    private readonly HashSet<string> _targetModifiers;
    private readonly LowLevelKeyboardProc _proc;
    private IntPtr _hookHandle = IntPtr.Zero;
    private bool _control;
    private bool _alt;
    private bool _shift;
    private bool _super;
    private bool _triggered;

    public ModifierOnlyHotkeyContext(string shortcut)
    {
        _targetModifiers = ParseShortcut(shortcut);
        if (_targetModifiers.Count == 0)
        {
            throw new ArgumentException("Shortcut must contain at least one modifier.", "shortcut");
        }

        _proc = HookCallback;
    }

    public void Start()
    {
        using (Process currentProcess = Process.GetCurrentProcess())
        using (ProcessModule mainModule = currentProcess.MainModule)
        {
            IntPtr moduleHandle = GetModuleHandle(mainModule.ModuleName);
            _hookHandle = SetWindowsHookEx(WH_KEYBOARD_LL, _proc, moduleHandle, 0);
        }

        if (_hookHandle == IntPtr.Zero)
        {
            throw new Win32Exception(Marshal.GetLastWin32Error());
        }

        Console.WriteLine("READY");
        Console.Out.Flush();
    }

    protected override void Dispose(bool disposing)
    {
        if (_hookHandle != IntPtr.Zero)
        {
            UnhookWindowsHookEx(_hookHandle);
            _hookHandle = IntPtr.Zero;
        }

        base.Dispose(disposing);
    }

    private static HashSet<string> ParseShortcut(string shortcut)
    {
        HashSet<string> set = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        string[] parts = (shortcut ?? String.Empty).Split('+');

        foreach (string raw in parts)
        {
            string token = NormalizeToken(raw);
            if (token.Length > 0)
            {
                set.Add(token);
            }
        }

        return set;
    }

    private static string NormalizeToken(string raw)
    {
        string token = (raw ?? String.Empty).Trim();

        if (token.Equals("Control", StringComparison.OrdinalIgnoreCase) || token.Equals("CommandOrControl", StringComparison.OrdinalIgnoreCase))
        {
            return "Control";
        }

        if (token.Equals("Alt", StringComparison.OrdinalIgnoreCase) || token.Equals("Option", StringComparison.OrdinalIgnoreCase))
        {
            return "Alt";
        }

        if (token.Equals("Shift", StringComparison.OrdinalIgnoreCase))
        {
            return "Shift";
        }

        if (token.Equals("Super", StringComparison.OrdinalIgnoreCase) || token.Equals("Meta", StringComparison.OrdinalIgnoreCase) || token.Equals("Win", StringComparison.OrdinalIgnoreCase))
        {
            return "Super";
        }

        return String.Empty;
    }

    private bool MatchesTarget()
    {
        HashSet<string> active = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        if (_control)
        {
            active.Add("Control");
        }

        if (_alt)
        {
            active.Add("Alt");
        }

        if (_shift)
        {
            active.Add("Shift");
        }

        if (_super)
        {
            active.Add("Super");
        }

        return active.SetEquals(_targetModifiers);
    }

    private static bool IsModifierKey(int vkCode)
    {
        switch (vkCode)
        {
            case VK_LSHIFT:
            case VK_RSHIFT:
            case VK_SHIFT:
            case VK_LCONTROL:
            case VK_RCONTROL:
            case VK_CONTROL:
            case VK_LMENU:
            case VK_RMENU:
            case VK_MENU:
            case VK_LWIN:
            case VK_RWIN:
                return true;
            default:
                return false;
        }
    }

    private void UpdateModifierState(int vkCode, bool isDown)
    {
        switch (vkCode)
        {
            case VK_LSHIFT:
            case VK_RSHIFT:
            case VK_SHIFT:
                _shift = isDown;
                break;
            case VK_LCONTROL:
            case VK_RCONTROL:
            case VK_CONTROL:
                _control = isDown;
                break;
            case VK_LMENU:
            case VK_RMENU:
            case VK_MENU:
                _alt = isDown;
                break;
            case VK_LWIN:
            case VK_RWIN:
                _super = isDown;
                break;
        }
    }

    private IntPtr HookCallback(int nCode, IntPtr wParam, IntPtr lParam)
    {
        if (nCode >= 0)
        {
            int message = wParam.ToInt32();
            bool isDown = message == WM_KEYDOWN || message == WM_SYSKEYDOWN;
            bool isUp = message == WM_KEYUP || message == WM_SYSKEYUP;

            if (isDown || isUp)
            {
                int vkCode = Marshal.ReadInt32(lParam);
                if (IsModifierKey(vkCode))
                {
                    UpdateModifierState(vkCode, isDown);
                    bool matches = MatchesTarget();

                    if (matches && isDown && !_triggered)
                    {
                        _triggered = true;
                        Console.WriteLine("TRIGGER");
                        Console.Out.Flush();
                    }

                    if (!matches)
                    {
                        _triggered = false;
                    }
                }
            }
        }

        return CallNextHookEx(_hookHandle, nCode, wParam, lParam);
    }

    [DllImport("user32.dll", SetLastError = true)]
    private static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc lpfn, IntPtr hMod, uint dwThreadId);

    [DllImport("user32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool UnhookWindowsHookEx(IntPtr hhk);

    [DllImport("user32.dll", SetLastError = true)]
    private static extern IntPtr CallNextHookEx(IntPtr hhk, int nCode, IntPtr wParam, IntPtr lParam);

    [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    private static extern IntPtr GetModuleHandle(string lpModuleName);
}
"@

try {
  Add-Type -ReferencedAssemblies System.Windows.Forms -TypeDefinition $source -Language CSharp
  $context = New-Object ModifierOnlyHotkeyContext -ArgumentList $Shortcut
  $context.Start()
  [System.Windows.Forms.Application]::Run($context)
} catch {
  Write-Output ("ERROR: " + $_.Exception.Message)
  exit 1
}
