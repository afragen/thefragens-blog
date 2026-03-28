---
title: 'iCal - Exchange Time Zone Fix - Chapter 2'
pubDate: '2008-08-15'
categories: ['apple', 'code']
description: ''
---

It was a few months ago that I originally wrote the first incarnation of the [MailExchange2iCal script](https://thefragens.com/2008/04/ical-exchange-time-zone-fix/). Since then I've been in contact with a few users trying to make it work for them and I've found a number of peculiarities in the types of email invites sent by Exchange/Outlook. The biggest problem was that the time zone data for the event was improperly formatted. This caused all sorts of problems for Mac users. Let's start at the beginning. Sometimes integration of a Mac in the corporate environment is a bit difficult and takes a bit of ingenuity. This is especially true when dealing with Exchange. The current versions of iCal and iCal Server are CalDAV and iCalendar compliant. Only Outlook 2007 is said to be CalDAV and iCalendar compliant. Previous versions of Outlook are not compliant and don’t play well with other calendar applications. Here’s the actual [time zone (TZID)](http://www.kanzaki.com/docs/ical/tzid.html) spec and [the spec for how it should be formatted](http://www.kanzaki.com/docs/ical/tzid-p.html). You can see by looking at it that the TZID that Outlook produces is non-compliant. A quick Google search shows an [article](http://www.roughlydrafted.com/2007/07/21/using-iphone-ical-caldav-calendar-servers-and-mac-os-x-leopard-2/) or [two](http://hardware.itbusinessnet.com/articles/viewarticle.jsp?id=46651-1&afterinter=true) that explain this very well. I've found that there are at least 3 different types of invites that can be sent by Exchange/Outlook.

1. `METHOD:REQUEST` - This is the usual email requesting that you attend a meeting.
2. `METHOD:PUBLISH` - This is essentially a publication notice for an event. It doesn't ask you to reply.
3. `METHOD:CANCEL` - This is a cancellation notice for an event.

Additionally, I've found that the emails that contain these invites are formated in at least 3 different ways. Sometimes the calendar event is within the body of the message and is encoded with `Content-Transfer-Encoding` in either `8bit` or `quoted-printable`. Always the `.ics` file is attached. My script does the following:

1. It parses the message to either extract the calendar data from the body of the message or from the `.ics` attachment.
2. It then figures out if the invite is of type `METHOD:REQUEST`, `METHOD:PUBLISH` or `METHOD:CANCEL`.
3. If the invite is one of the first 2 types. The time zone is fixed and the event is imported into iCal. You might have to select into which calendar the event will be imported.
4. If the invite is of type `METHOD:CANCEL` then the script will locate the corresponding event and set it's status to cancelled.

- You will have to manually delete the event. It will appear in iCal to have a white strike-through font style.
- Repeating events all seem to have the same UID (Unique IDentifier).

I don't know why. Every repeating event will be thusly marked as cancelled. You will then manually delete the specific event and manually run the script again while the cancellation message is selected. This will reset the remaining repeating events back to confirmed. Yes, I know this is a bit of a kludge but I don't have a better method.

1. It will parse the message to allow for invites from multiple Exchange servers.

My script, now re-named `iCal-Invite-Fix.scpt`, will need to be customized for each Exchange server from which you receive invites. There are 3 properties at the beginning of the script. They are `exchange_fragment`, `ical_tzid` and `myCalendar`. These first two properties are lists and the order of the items is crucial. The specific item (position in list) of each list must correspond to each other.

- `exchange_fragment` is a unique fragment of the TZID that your Exchange server sends.
- `ical_tzid` is the time zone of the Exchange server in proper format.
- This means no spaces, though spaces are replaced automatically with the underscore '_'.
- For instance, I'm in Southern California and the correct time zone should be written as `US/Pacific` or `America/Los_Angeles`. You can find this information by selecting the time zone drop down menu in the upper right corner of your iCal window and select `Other...`. If you look in iCal's upper right corner for the time zone menu bar the last example will appear as `America/Los Angeles`.
- `myCalendar` is the name of the calendar that normally receives the events. It is needed for the cancellation to function.

Save the script and either set it up to run from a mail rule or as I do call it from the System AppleScript menu. You will need to save the script in ~/Library/Scripts/Applications/Mail/ folder. Create this folder if it doesn’t exist. To set the script up to run automatically you will need to create a new Mail rule as follows.

1. Mail -> Preferences -> Rules -> Add Rule
2. Description "iCal Invite Fix"
3. If "any" of the following conditions are met:
    - "Any Attachment Name" "ends with" ".ics"
4. Perform the following actions:
    - Run AppleScript "~/Library/Scripts/Applications/Mail/iCal-Invite-Fix.scpt"
5. Click "OK" and then "Apply"

You can also run the script manually from the system-wide script menu. To install this menu. Open up the `/Applications/AppleScript/AppleScript Utility.app` and check the `Show Script menu in menu bar` box. If you put the script in the folder location indicated above it will now be visible when Mail.app is the current application. [Download the iCal-Invite-Fix script](http://pub.thefragens.com/iCal-Invite-Fix.scpt). Please let me know if there are any problems or you need help setting this up. The script was not entirely my creation and [credit also goes to others](http://www.macosxhints.com/article.php?story=20060821073102694). I’m quite certain any errors are likely mine. ;-) **Updated**: Now produces CalDAV-compliant TZIDs, no quotes. **Updated again**: Now will move the .ics files from /tmp to the Trash. **Update 12/03/2008**: Fixed the `METHOD:PUBLISH` invite to no longer ask to select which calendar to add event. It will automatically select the first local calendar, like it does with `METHOD:REQUEST`. **Updated 12/28/2008**: Added ability to use single script with multiple Exchange servers. The trade-off is a slightly more complex set up.
