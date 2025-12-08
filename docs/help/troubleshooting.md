---
sidebar_position: 2
title: Troubleshooting
---

# Troubleshooting Guide

Common issues and how to resolve them.

## Connection Issues

### "Connection Failed" Error

**Symptoms:** Platform shows connection failed or cannot connect to server.

**Solutions:**
1. **Verify credentials** - Double-check username and password
2. **Check platform settings** - Ensure you're connecting to the correct server
3. **Firewall** - Add your trading platform to firewall exceptions
4. **VPN** - Disable VPN if using one
5. **Restart** - Close and reopen your platform

### Slow Data Feed

**Symptoms:** Delayed quotes, charts not updating, laggy order execution.

**Solutions:**
1. Check your internet connection speed
2. Close other bandwidth-heavy applications
3. Reduce the number of open charts
4. Contact your ISP if issues persist

---

## Trading Issues

### Order Rejected

**Common Reasons:**

| Error | Cause | Solution |
|-------|-------|----------|
| "Insufficient margin" | Not enough buying power | Reduce position size |
| "Position limit exceeded" | Too many contracts | Close some positions first |
| "Market closed" | Outside trading hours | Wait for market open |
| "Invalid price" | Limit price too far from market | Adjust your limit price |

### Position Not Showing

If a position doesn't appear in your platform:

1. Refresh your positions/orders window
2. Check the "All Accounts" view (not just one account)
3. Verify the order was actually filled (check order history)
4. Wait 30 seconds and refresh again

### Incorrect Commission

Commission is charged per side (entry and exit):
- **Full-size contracts:** $4.20 round-turn
- **Micro contracts:** $0.52 round-turn

If commissions seem wrong, contact support with your trade details.

---

## Account Issues

### Can't Log Into Dashboard

1. Clear your browser cache and cookies
2. Try a different browser
3. Use the "Forgot Password" link
4. Check if your account email is correct

### Account Shows "Inactive"

Your account may be inactive if:
- Payment failed or was refunded
- Evaluation was failed
- Account was flagged for rule violations

Contact support for clarification.

### Missing Trading Days

A trading day requires:
- At least one position opened
- Position held for minimum 1 minute

Day trades that are opened and closed within seconds may not count.

---

## Platform-Specific Issues

### NinjaTrader 8

**Chart not loading:**
1. Right-click the chart > Reload All Historical Data
2. Check Data Series settings
3. Verify connection in Control Center

**Indicators missing:**
1. Go to Tools > Options > Market Data
2. Ensure "Download instrument lists" is enabled
3. Restart NinjaTrader

### Tradovate

**Can't place orders:**
1. Verify you're on a live account (not sim)
2. Check that the market is open
3. Ensure you have the correct permissions

### Rithmic

**Connection keeps dropping:**
1. Update to the latest version
2. Check your Rithmic server selection
3. Verify your internet stability

---

## Still Need Help?

If you've tried the solutions above and still have issues:

1. **Discord:** Get real-time help from our community
2. **Email:** support@traderslaunch.com (24-48 hour response)
3. **Live Chat:** Available on traderslaunch.com during business hours

When contacting support, please include:
- Your account ID
- Screenshots of the issue
- Steps to reproduce the problem
- Time the issue occurred
