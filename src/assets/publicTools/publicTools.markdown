### How to install Radio Userland tools

Download the file to your Tools folder at the root level of your Radio UserLand folder. Wait about a minute and the tool will automatically load. You will see the tool's name in the Tools menu. If this doesn't seem to work simply restart Radio.

* [Dashboard](../wp-content/publicTools/dashboard.root)

  Dashboard is a conversion of Dann Sheridan's [real-time data receiver](http://radio.weblogs.com/0001134/stories/2002/02/16/turningYourBrowserIntoARealtimeDataReceiver.html) scripts into a tool. It's mostly a proof of concept thing.

* [Data File Cleaner](../wp-content/publicTools/dataFileCleaner.root)

  This tool is a compilation of my cleanAggregator script and Greg Hanek's cleanWeblogComEntries script and more. It will remove certain errant entries from your Data Files that cause problems.

* [Export Weblog](../wp-content/publicTools/exportWeblog.root)

  This tool was written to export posts from your `weblogData.root` file into individual text files. It will create files in plain text or as unix text files for [Blosxom](http://www.blosxom.com) or [Movable Type](http://www.movabletype.org/) weblogs.

  When you first install this tool it will ask you to select a folder in which to save the newly created text files.

* [Install codeFreshener](../wp-content/publicTools/installCodeFreshener.root)

  This tool was written to make life easier for tool developers. It will insert a customized version of Dave Winer's codeFreshener scripts into your tool.

* [Keep Web Server Up](../wp-content/publicTools/keepWebServerUp.root)

  This tool was written with insight and assistance from Sam DeVore. It serves a specific purpose. Apparently when using Radio 8 under Mac OS X 10.2 (Jaguar) something may cause the Web Server may become inactive. Stopping and restarting the Web Server seems to fix this problem. This tool automates that process. When UserLand fixes this then simply remove the tool from your Tools folder.

* [Offline Toggle](../wp-content/publicTools/offlineToggle.root)

  It sends out call to tcp.myAddress to test for a network connection. Depending on the status of the network connection the script will toggle `Work Offline` and `Upstreaming...` accordingly. This should be very helpful to laptop users.

  It uses a different call for OS X. For some reason `tcp.myAddress` doesn't work the way it should on my Mac.

  This tool will now work on any platform -- my bad for the script version.

* [Markdown](../wp-content/publicTools/markdown.root)

  Co-written with Patrick Ritchie and Marc Barrot.
  
  **How it works**

  * Uses a callback at post time to render the post text through the Markdown script/renderer and then saves the Markdown rendered text to a new item inside `weblogData.root` .
  * Swaps the rendered text into publishing/rendering as needed for posts and RSS.
  * The original user entered marked-up text remains unchanged in `weblogData.root` .
  * Actually this is a blend of both methods and preferentially uses the pre-render/swap method if available.
  * In editing you see marked-up text.
  * In publishing/rendering/upstreaming you see Markdown rendered text.
  * The default, pre-render/swap method, also incorporates rendering on the fly as needed.

&nbsp;

* [Print Outline](../wp-content/publicTools/printOutline.root)

  This tool is meant to be used from within the Radio application.

  Use it to convert any outline or script to HTML so that it can be shared or printed.
This tool provides for a quick and convenient way to render and therefore print any outline. It utilizes the renderers listed in the `user.html.renderers` table and rebuilds the submenu at every startup. It also makes use of the `pikeRenderer` so XML and OPML files can use [rules](http://radio.userland.com/howtouseradiowithmanila.html#rules) to be rendered. Also see Andy Sylvester's [Rules in Radio UserLand](http://ruminations.weblogger.com/discuss/msgReader$16). If you want an exact representation of what is in your outline or script then use the sampleScriptRenderer.

  What happens is the frontmost outline is copied to a temporary odb item and then rendered using your choice of renderer. It is then opened in your web browser to be printed.

  There will be html files created on your drive in the Websites folder that is in the same folder as your application.

  **Multiple templates**

   * Additional templates must be stored at user.html.templates
   * The names of the extra templates that you wish to render must be added to the list at printOutlineData.extraTemplates
   * Rendered html will be saved at printOutlineWebsite.renderedHTML so you can do with it as you will. It will also be placed in the clipboard. But it will be deleted at startup.

&nbsp;

* [pLessFix](../wp-content/publicTools/pLessFix.root)

  Fixes the multiple `<p>` tags that seem to be inserted upon upstreaming.

  This has now been fixed in Radio and the tool is no longer necessary. The code is still available if anyone wants to use it for ideas.

* [Root Updates Report](../wp-content/publicTools/rootUpdatesReport.root)

  Root Updates Report will read the current days updates from logs in a guest database (GDB) or all root updates from the outline. Root Updates Report will use either the GDB log or the outline log depending on your selections in the `user.log.prefs` table. It will preferentially use the GDB if both are checked. It does not utilize the text file.

* [Scripts](../radio-userland-scripts/)

  This page contains scripts for Radio 8.
