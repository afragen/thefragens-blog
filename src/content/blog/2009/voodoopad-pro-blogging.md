---
title: 'VoodooPad Pro Blogging'
pubDate: '2009-05-07'
categories: ['code', 'mac-osx']
tags: ['blogging', 'code', 'mac-osx']
description: 'Please note that VoodooPad Pro has been renamed to'
---

Please note that VoodooPad Pro has been renamed to VoodooPad. It's time to package up all my [VoodooPad](http://flyingmeat.com/voodoopad/) blogging scripts and assorted web export plugins so that I can

1. Remember what the heck I was thinking.
2. Remember what all these pieces were supposed to accomplish as a whole.
3. Provide some sort of reference to others interested in this stuff.

**Concept:** To use VoodooPad as a CMS for a web site, allowing for static sites and inclusion of blog-style concatenated page. The blog-style page was originally intended as a _News_ page of a static business site. SEO optimization necessitating the addition of a page with re-newing content. _Google likes it more._ Disclaimer: I like [Markdown](http://daringfireball.net/projects/markdown/) and built these scripts around the fact that the VP document is essentially always formatted in plain text. Images need to be added using links. I will include a [sample package](http://pub.thefragens.com/sample-project.zip) that contains a VP document, a web export plugin and several script plugins. The site the sample is based upon is at. VoodooPad is a requirement as the meta data and triggers are necessary in the creation of the files. My workflow is as follows.

1. Create new page/post.
2. Run script plugin `Blog &gt; Meta Markup - HomepageMeta` on new page.
3. Run script plugin `Blog &gt; Make Homepage and Feed`
4. Run web export.
5. FTP files up to site. I use [Transmit](http://www.panic.com/transmit/). It's also a great app.

The script will move all the created files into a folder structure so that the file structure on the computer will match the web site structure. **VoodooPad document** **Item meta** data is contained in the `HomepageMeta` page of the document. This is where most of the personalized info on the site is contained. In the VP document, _tags_ are used to create a pseudo-folder structure. This means that a page may only have one tag. Some pages are not exported but are used as reference, ie. links in the sidebar or the HomepageMeta page. Pages that are to be rendered at the root level of the site are tagged `main`. **Triggers** can be used to include certain information into specific pages or info on every page. I use this for things like Google Analytics which needs to be on every page or the analytics confirmation that is only on the index.html page. **The Web Export Plugin** Some customization of these files will be necessary for your specific site.

> Images are kept in the web export plugin. Files like `robots.txt` that need to be at the root level are kept in a `root` folder inside the web export plugin.

- `preflight.sh` - creates the actual folder hierarchy, the folders are created in the `preflight.sh` script. The `preflight.sh` script also copies files like images to the export folder.
    
- `postflight.sh` - can be used to rename pages that may be PHP based from `.html` to `.php`
    
- `deleteVPExtra.sh` - deletes the _extra_ pages that VoodooPad creates during a web export. No changes to this file are needed.
    
- `fixRelativePaths.sh` - fixes the relative URLs that occur inside of nested pages. No changes to this file are needed.
    
- `parseMetaXml.rb` - Parses the meta.xml file that VoodooPad creates and uses that infomation to move files into their correct folder structure on the disk and to create a valid sitemap.xml file for use with Google Sitemaps. It also creates and parses the vpDocMeta.xml file for variables.
    
- `Info.plist` - This file was edited to call these scripts during the web export process.
    
- `vpDocMeta.xml` - This file resides inside the `root` folder of the Web Export Plugin. It is created by the parseMetaXml.rb script. It contains the following data points.
    
- `root` - default value is `main`. This is the name of the tag of rendered pages that belong at the root level of the folder structure.
- `baseUrl` - This is the base URL for the site for creation of the sitemap.xml file.
- `isHomeIndex` - default value is `false`. This is only used if the the page name in VP for the index page of the site is `home`. This is true if the main page is a blog-style homepage.
- `noIndex` - default value is `private`. This is the name of a directory whose files you don't want included in sitemap.xml.

**Script Plugins** These are placed in the `~/Library/Application Support/VoodooPad/Script PlugIns/` folder. No changes should be required in these scripts. They will be viewable from the `Plugin &gt; Blog` menu in VoodooPad.

- `meta_markup_HomepageMeta.lua` - Takes the data from the page `HomepageMeta` in the VP doc and adds specific item meta data to the frontmost page.
- `meta_markup_update.lua` - Propagates changes made to the `HomepageMeta` page to all the item meta data of all pages that require them. This is only just the pages used for the blog-style page.
- `blog_home_atom.lua` - Creates the blog-style page now called `home` in the VP document and also creates a valid atom.xml feed in the output directory.

Comments and questions are welcome. If some enterprising person wants to wrap this all up in the new plugin architecture that would be cool. I'm happy to help if I can.
