---
title: 'The Events Calendar Outlook Import Fix'
pubDate: '2014-08-01'
categories: ['code', 'wordpress-2']
tags: ['events', 'outlook']
description: 'In [The Events Calendar](https://wordpress.org/plu'
---

In [The Events Calendar](https://wordpress.org/plugins/the-events-calendar) the ability to add an event to your calendar via an iCalendar file is now in the core plugin. This used to be a feature only in the Events Calendar PRO plugin. Out of the box this works great for either Google Calendar or Apple's Calendar. However, in Outlook, adding the event would create a whole new calendar instead of adding the event to the user's default calendar. 

It seems that the issue is simply the addition of the **X-WR-CALNAME** header in the generated iCalendar file. This header is valid according to [iCalendar](http://en.wikipedia.org/wiki/ICalendar#cite_ref-13). Unfortunately Outlook doesn't seem to like this and its inclusion causes the creation of an entirely new calendar and not just a new calendar event. 

The solution is to remove this line. When this is done an event will be added to the default Outlook calendar. A while ago I wrote a quick function to remove this line. This solution was made much simpler by Modern Tribe's inclusion of a nice filter hook. Lately I've found more people having this [issue](http://tri.be/support/forums/topic/ical-import-how-do-we-get-it-to-add-event-to-an-existing-calendar-in-outlook-2/) and having difficulty implementing the fix. In order to simplify the solution I've converted the solution to a plugin. So go grab [The Events Calendar Outlook Import Fix](https://wordpress.org/plugins/the-events-calendar-outlook-import-fix) plugin from the WP.org repo. All you have to do is install and activate. Please bear in mind, when this plugin is active users of other calendaring apps **may** have problems. This is a solution for sites whose users only use Outlook.
