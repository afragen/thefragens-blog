### Radio Userland Scripts

How to install scripts into your Radio.root

1. Download the file to your local hard drive.

2. You will then need to install it into Radio. Bring your Radio application to front. From the 'File' menu choose 'Open...' and then select the newly downloaded script. You will be asked if you want to install the script into a specific location, click Yes. You will then see the script in a window.

3. Click Compile, then click Run.


  * cleanAggregatorStories

  This script is now part of the dataFileCleaner Tool so go back to my Public Tools page.

  This is a quick script to delete the empty stories from the `aggregatorData.stories` table. Typically these are stories whose only content is HTML markup. Since they don't show up in the News Aggregator page they don't get deleted. The Scripting News feed is a big culprit.

  * cleanWeblogsComEntries

  This script is now part of the dataFileCleaner Tool so go back to my Public Tools page.

  * [ioArchiver](../wp-content/publicTools/scripts/ioArchiver.ftsc)

  I'm currently converting this over to a Tool for simpler installation. If you are interested please contact me and I'll send you an advance copy. It's fully functional but the tool hasn't been cleaned up yet.

  This script will place a button in your Instant Outline (IO) that allows for easy archiving. It is based on [Tom Clifton's](http://radio.weblogs.com/0100021/) radioArchiver. This version will grab the date from a date string in the node, if there is no date then the current date is used.

  You need to install this [table][] for the buttons to work. After this [table][] is installed, install and run the [ioArchiver](./wp-content/publicTools/scripts/ioArchiver.ftsc) script. Installation is automatic. Then simply close and reopen your IO to see the buttons and archive away.

   [table]: ../wp-content/publicTools/scripts/windowTypes.outlinerFile.fttb

  * [myFixFilePathsAndAddresses](../wp-content/publicTools/scripts/myFixFilePathsAndAddresses.ftsc)

  This script is an improvement to the one UserLand provides in the workspace.userlandSamples table. If you move your Radio UserLand folder to another location on your hard disk or to another computer then your copy of Radio UserLand will not work. That is because there are many internal references to absolute file paths within the Radio.root. To correct these references download this script and open it from the Radio File > Open menu. Then run the script. It will ask for your prior file path, the default choice should be correct. When the script finishes everything should work again.

  * offlineToggle

  This script is now a tool so go back to my Public Tools page.

  * [ptaTableOutliner](../wp-content/publicTools/scripts/ptaTableOutliner.ftsc)
  
  The tableOutliner renderer supplied by UserLand doesn't use the pageTableAddress and when used with the renderDesktopFile script gives an error. Using this render solves the problem.

  * [renderDesktopFile](../wp-content/publicTools/scripts/renderDesktopFile.ftsc)
  
  This is a script that will allow you to place desktop files into a Radio 8 page for rendering. There was a change from Radio 7 to Radio 8 that made the `renderObject` macro not work for desktop files only for ODB files. This is the solution. It takes as a parameter the file path of the file to be rendered.

  * [saveCopyOpenDatabases](../wp-content/publicTools/scripts/saveCopyOpenDatabases.ftsc)

  I didn't write this but it saves a copy of all open databases (ODB) to a Backup databases folder located at the root level of the Radio UserLand folder. Very useful for backups.

  * [titleCase](../wp-content/publicTools/scripts/titleCase.ftsc)

  Converts any text entered into title case where the first letter of each word is capitalized.

  * [toggleOutlineWP](../wp-content/publicTools/scripts/toggleOutlineWP.ftsc)

  Simple script to be called from a menu that will convert an outline to a `wp` object and back again.

  * [ulOutline](../wp-content/publicTools/scripts/ulOutline.ftsc)

  This script is an outline renderer that produces a simple unordered list. It should be similar to what you see in the outline with indents. Tableless.

  * [wipeCloud](../wp-content/publicTools/scripts/wipeCloud.ftsc)

  This script will delete all items from your cloud space. After it has completed running you will see 100% space available in the Cloud Status section of your Status Center. In order to replace your Cloud you will need to select Radio > Publish > Entire Site from the Radio application's menu. **Warning:** If you do not understand this then don't use this script.

  Updated to work with Salon blogs.
