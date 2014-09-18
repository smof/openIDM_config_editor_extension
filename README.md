<b>OpenIDM Configuration Editor Extension</b>
<br/>
<br/>
A community contribution for editing OpenIDM configuration objects via a user interface.  Note this is only tested for v3.0 of OpenIDM.  This
is in no way an officially supported tool, simply a community contribution.  Use as-is, no warranty.
<br/>
<br/>
<b>Installation</b>
<br/>
Copy both the config.html and config.js into the path/to/openidm/ui/extension/templates directory of your OpenIDM installation.  To access the UI, simply navigate to http://server:port/openidmui/templates/config.html.  You need to be already logged into your OpenIDM instance as the app relies on an active
cookie.
<br/>
If a 401 Access Denied message is seen, your cookie has expired.  Log back into OpenIDM with admin credentials and navigate back to config.html
<br/>
Known issue - the Verify Connector function is incomplete.
<br/>

