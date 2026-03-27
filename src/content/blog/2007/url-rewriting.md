---
title: 'URL Rewriting'
pubDate: '2007-11-12'
categories: ['code']
description: ''
---

This is a real late addition. _The following is a tutorial from Ross Shannon on URL rewriting. Like [Marlyse][8] I'm repeating the content for my future use._ 

## [An Introduction to Rewriting][12] by [Ross Shannon][9] 

The Apache server's `mod_rewrite` module gives you the ability to transparently redirect one URL to another, without the user's knowlege. This opens up all sorts of possibilities, from simply redirecting old URLs to new addresses, to cleaning up the 'dirty' URLs coming from a poor publishing system -- giving you URLs that are friendlier to both readers and search engines. _This page was last updated on 2005-02-10_ 

Readable URLs are nice. A well designed website will have a logical file system layout, with smart folder and file names, and as many implementation details left out as possible. In the best designed sites, readers can **guess at filenames with a high level of success**. However, there are some cases when the best possible information design can't stop your site's URLs from being nigh-on impossible to use. For instance, you may be using a Content Management System that serves out URLs that look something like http://www.site.com/viewcatalog.asp?category=hats&prodID=53 

This is a horrible URL, but it and its brethren are becoming increasingly prevalent in these days of dynamically generated pages. There are a number of problems with an URL of this kind. 

* It **exposes the underlying technology** of the website (in this case ASP). This can give potential hackers clues as to what type of data they should send along with the query string to perform a 'front-door' attack on the site. Information like this shouldn't be given away if you can help it. Even if you're not overly concerned with the security of your site, **the technology you're using is at best irrelevant** -- and at worst a source of confusion -- to your readers, so it should be hidden from them if possible. Also, if at some point in the future you decide to change the language that your site is based on (to [» PHP][1], for instance); all your old URLs will stop working. This is a pretty serious problem, as anyone who has tackled a full-on site rewrite will attest. 
* **The URL is littered with awkward punctuation**, like the question mark and ampersand. Those & characters, in particular, are problematic because if another webmaster links to this page using that URL, the unescaped ampersands will mess up their [XHTML][2] conformance. 
* Some **search engines won't index pages which they think are generated dynamically**. They'll see that question mark in the URL and just turn their asses around. Luckily, using rewriting, we can clean up this URL to something far more manageable. For example, we could map it to http://www.site.com/catalog/hats/53/ Much better. 

This URL is more logical, readable and memorable, and will be picked up by all search engines. The _faux_-directories are short and descriptive. Importantly, it looks more _permanent_. To use `mod_rewrite`, you supply it with the link text you want the server to match, and the real URLs that these URLs will be redirected to. The URLs to be matched can be straight file addresses, which will match one file, or they can be _regular expressions_, which will match many files. ## Basic Rewriting Some servers will not have [» mod_rewrite][3] enabled by default. As long as the [» module][4] is present in the installation, you can enable it simply by starting a .htaccess file with the command `**RewriteEngine** on` 

Put this .htaccess file in your root so that rewriting is enabled throughout your site. You only need to write this line once per .htaccess file. 

### Basic Redirects 

We'll start off with a straight redirect; as if you had moved a file to a new location and want all links to the old location to be forwarded to the new location. Though you shouldn't really ever [» move a file][5] once it has been placed on the web; at least when you _simply have to_, you can do your best to stop any old links from breaking. 

` **RewriteEngine** on **RewriteRule** **^**old.html**$** new.html ` 

Though this is the simplest example possible, it may throw a few people off. The structure of the 'old' URL is the only difficult part in this `RewriteRule`. There are three special characters in there. 

* The caret, `^`, signifies the **start of an url**, under the current directory. This directory is whatever directory the .htaccess file is in. You'll start almost all matches with a caret. 
* The dollar sign, `$`, signifies the **end of the string to be matched**. You should add this in to stop your rules matching the first part of longer URLs. 
* The period or dot before the file extension is a special character in regular expressions, and would mean something special if we didn't **escape it with the backslash**, which tells Apache to treat it as a normal character. So, this rule will make your server transparently redirect from old.html to the new.html page. Your reader will have no idea that it happened, and it's pretty much instantaneous. 

### Forcing New Requests 

Sometimes you _do_ want your readers to know a redirect has occurred, and can do this by forcing a new HTTP request for the new page. This will make the browser load up the new page as if it was the page originally requested, and the location bar will change to show the URL of the new page. All you need to do is turn on the `[R]` flag, by appending it to the rule: ` **RewriteRule** **^**old.html**$** new.html **[R]** ` 

## Using Regular Expressions 

Now we get on to the _really_ useful stuff. The power of `mod_rewrite` comes at the expense of complexity. If this is your first encounter with regular expressions, you may find them to be a tough nut to crack, but the options they afford you are well worth the slog. I'll be providing plenty of examples to guide you through the basics here. 

Using regular expressions you can have your rules matching a set of URLs at a time, and mass-redirect them to their actual pages. Take this rule; ` **RewriteRule** **^**products/([0-9][0-9])/**$** productinfo.php?prodID=$1 ` This will match any URLs that start with 'products/', followed by any two digits, followed by a forward slash. 

For example, this rule will match an URL like products/12/ or products/99/, and redirect it to the PHP page. The parts in square brackets are called _ranges_. In this case we're allowing anything in the range 0-9, which is any digit. Other ranges would be `[A-Z]`, which is any uppercase letter; `[a-z]`, any lowercase letter; and `[A-Za-z]`, any letter in either case. We have **encased the regular expression part of the URL in parentheses**, because we want to **store whatever value was found here for later use**. In this case we're sending this value to a PHP page as an argument. Once we have a value in parentheses we can use it through what's called a _back-reference_. **Each of the parts you've placed in parentheses are given an index, starting with one**. So, the first back-reference is `$1`, the third is `$3` etc. Thus, once the redirect is done, the page loaded in the readers' browser will be something like productinfo.php?prodID=12 or something similar. Of course, we're keeping this true URL secret from the reader, because it likely ain't the prettiest thing they'll see all day. 

### Adding Trailing Slashes 

If your site visitor had entered something like products/12, the rule above won't do a redirect, as the slash at the end is missing. To promote good URL writing, we'll take care of this by doing a direct redirect to the same URL with the slash appended. ` **RewriteRule** **^**products/([0-9][0-9])**$** products/$1/ **[R]** ` **Multiple redirects in the same .htaccess file can be applied in sequence**, which is what we're doing here. This rule is added before the one we did above, like so: ` **RewriteRule** **^**products/([0-9][0-9])**$** products/$1/ **[R]** **RewriteRule** **^**products/([0-9][0-9])/**$** productinfo.php?prodID=$1 ` 

Thus, if the user types in the URL products/12, our first rule kicks in, rewriting the URL to include the trailing slash, and doing a new request for products/12/ so the user can see that we likes our trailing slashes around here. Then the second rule has something to match, and transparently redirects this URL to productinfo.php?prodID=12. _Slick._ 

### Match Modifiers 

You can expand your regular expression patterns by adding some modifier characters, which allow you to match URLs with an indefinite number of characters. In our examples above, we were only allowing two numbers after products. This isn't the most expandable solution, as if the shop ever grew beyond these initial confines of 99 products and created the URL productinfo.php?prodID=100, our rules would cease to match this URL. So, instead of hard-coding a set number of characters to look for, we'll work in some room to grow by allowing any number of characters to be entered. The rule below does just that: ` **RewriteRule** **^**products/([0-9]**+**)**$** products/$1/ **[R]** ` Note the plus sign (`+`) that has snuck in there. This modifier changes whatever comes directly before it, by saying '**one or more of the preceding character or range**.' 

In this case it means that the rule will match any URL that starts with products/ and ends with at least one digit. So this'll match both products/1 and products/1000. 

### Adding Guessable URLs 

Using these simple commands you can set up a slew of 'shortcut URLs' that you think visitors will likely try to enter to get to pages they know exist on your site. For example, I'd imagine a lot of visitors try jumping straight into our [stylesheets][6] section by typing the URL http://www.yourhtmlsource.com/css/. We can catch these cases, and hopefully alert the reader to the correct address by updating their location bar once the redirect is done with these lines: ` **RewriteRule** **^**css(/)?**$** /stylesheets/ **[R]** ` 

The simple regular expression in this rule allows it to match the css URL with or without a trailing slash. The question mark means 'zero or one of the preceding character or range' -- in other words either yourhtmlsource.com/css or yourhtmlsource.com/css/ will both be taken care of by this one rule. This approach means less confusing [404 errors][7] for your readers, and a site that seems to run a whole lot smoother all 'round. [1]: http://php.net/ [2]: http://www.yourhtmlsource.com/accessibility/xhtmlexplained.html [3]: http://httpd.apache.org/docs/mod/mod_rewrite.html [4]: http://modules.apache.org/ [5]: http://www.w3.org/Provider/Style/URI.html (As Sir Tim says, &‘Cool URIs don&’t change&’) [6]: http://www.yourhtmlsource.com/stylesheets/ [7]: http://www.yourhtmlsource.com/sitemanagement/custom404error.html (Even if you&’ve set up your own, nobody likes to hit them) [8]: http://www.marlyse.com/index.php?p=490 [9]: http://www.yourhtmlsource.com/about/ [12]: http://www.yourhtmlsource.com/sitemanagement/urlrewriting.html
