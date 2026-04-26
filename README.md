[//]: #@corifeus-header

  [![NPM](https://img.shields.io/npm/v/p3x-angular-compile.svg)](https://www.npmjs.com/package/p3x-angular-compile)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://paypal.me/patrikx3) [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Corifeus @ Facebook](https://img.shields.io/badge/Facebook-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)  [![Uptime ratio (90 days)](https://network.corifeus.com/public/api/uptime-shield/31ad7a5c194347c33e5445dbaf8.svg)](https://network.corifeus.com/status/31ad7a5c194347c33e5445dbaf8)





# 🆖 Angular Dynamic Compile - Convert strings to Angular components v2026.4.107


  
🌌 **Bugs are evident™ - MATRIX️**  
🚧 **This project is under active development!**  
📢 **We welcome your feedback and contributions.**  
    



### NodeJS LTS is supported

### 🛠️ Built on NodeJs version

```txt
v24.14.1
```




# 📦 Built on Angular

```text
21.2.10
```



# 📝 Description

                        
[//]: #@corifeus-header:end


# WARNING
Angular has changed, so it stricts many things for dynamic compilation. The only solution right now, is to simple copy the code into your code and it will work (like on https://angular-compile.corifeus.com/).  
  
The code you just copy into your project is here:  
https://github.com/patrikx3/angular-compile/tree/master/projects/angular-compile/src/lib
  
The package on the NPM is the pure TypeScript code. Not built using Angular.

# Use case
Dynamically compile standard strings to fully functional Angular components. Supports imports, exports, and standard context.

## Install
  
```bash
npm install --save p3x-angular-compile
# or
yarn add p3x-angular-compile
```

## Check out how it works and code

https://angular-compile.corifeus.com  

https://github.com/patrikx3/angular-compile/blob/master/src/app/app.component.ts

## IMPORTANT


Make sure AOT is disabled in the `angular.json`:
```json
{ 
    "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/workspace",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            
            // make sure it is false
            "aot": false,

            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
    }
}
```


#### Minimum build requirement arguments

```bash
ng build --aot=false --build-optimizer=false
```


## Usage

`CompileAttribute` is now a **standalone component**. You can use it either directly in a standalone component or via the legacy `CompileModule` NgModule — both paths are fully supported.

### Standalone (Angular 16+)

```typescript
import { Component } from '@angular/core';
import { CompileAttribute } from 'p3x-angular-compile';

@Component({
  selector: 'my-page',
  standalone: true,
  imports: [CompileAttribute],
  template: `<span [p3x-compile]="template" [p3x-compile-ctx]="this"></span>`,
})
export class Page {
  template = '<button (click)="context.alert()">Dynamic template</button>';
  alert() { alert('ok'); }
}
```

### Legacy NgModule (unchanged)

```typescript
import { CompileModule } from 'p3x-angular-compile';

@NgModule({
    imports: [
        CorifeusWebMaterialModule, // Optional
        CompileModule, // Required
    ],
    declarations: [
        Page,
    ],
    providers: [
    ],
    bootstrap: [ Page ]
})
export class Module { };
```

#### Template    
```html
 <span 
 
 <!--- Not required -->
 *ngIf="isEnabled" 

 <!--- Required -->
 [p3x-compile]="template"

 <!--- Required -->
 [p3x-compile-ctx]="this"

 <!--- Not required, will just throw the component's exception if not provided -->
 [p3x-compile-error-handler]="handleCompileErrorHandler"

 <!--- Not required -->
 [p3x-compile-module]="dataModule"
 >     
</span>
```

#### Code
```typescript
// A page example
export class Page {
    
    isEnabled: boolean = true;
    
    dataModule : any =  {
        //schemas: [CUSTOM_ELEMENTS_SCHEMA],
        //declarations: [],
        imports: [
            MatButtonModule
        ],
        exports: [       
        ]
    }

    template: string = "<button mat-button mat-raised-button (click)="context.alert()">Dynamic template</button>";

    handleCompileErrorHandler(error: Error) {
        console.error(error)
    }

    alert() {
        alert('ok');
    }
}
```

<!--

#### Actual used dynamic compiler
I use a dynamic Markdown page with ```p3x-angular-compile```:
[Module](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/module.ts) , [Example page](https://github.com/patrikx3/corifeus-app-web-pages/blob/master/src/angular/modules/cory-page.ts)


#### Service
[Please refer to use an a service](https://github.com/patrikx3/angular-compile/blob/master/test/angular-webpack/angular/page.ts)

```typescript
export interface CompileOptions {   
    // cached by template
    template: string;
    container: ViewContainerRef;
    context?: any,
    
    // you can customize here any you want to
    // CommonModule, BrowserModule are auto added 
    // (like *ngIf and angular default directives)
    // though CompileModule.forRoot is usually enough
    // so you do not need to use it
    module?: NgModule;
    
    onCompiled?: Function,
    onError?: Function;

}
```

-->

### Options
[Reference for the Angular module settings which are available.](
https://github.com/angular/angular/blob/master/packages/core/src/metadata/ng_module.ts)

<!--
The templates are cached.
-->

<!--

### Deployed example
[Corifeus Pages (JIT + AOT at once)](https://corifeus.com)

#### For now, until there is no options in Angular to use JIT, I just use AOT, so I don't use this component  

[Corifeus Pages (AOT)](https://corifeus.com)

  
[https://github.com/patrikx3/angular-compile/blob/master/src/app/app.component.ts](https://github.com/patrikx3/angular-compile/blob/master/src/app/app.component.ts)

  -->



## Dev environment end test
   
```bash
npm install -g yarn
git clone https://github.com/patrikx3/angular-compile.git
cd angular-compile
npm install
npm run start
```

[http://localhost:4200](http://localhost:4200)



# Errors

## Type x is part of the declarations of 2 modules
 
Basically, you need a shared component.
 
https://stackoverflow.com/questions/42993580/angular-2-type-childcomponent-is-a-part-of-the-declarations-of-2-modules-par

## AOT + JIT

### Since Angular 5.x.x +

We cannot use AOT + JIT at once.


#### Info
https://github.com/angular/angular/issues/20156#issuecomment-341767899

On the issue, you can see:
```text
To reduce the payload, we do not ship the compiler in AOT.
```


So right now, it is not possible.

Although, there are some hacks, but you are on your own...  
https://github.com/angular/angular/issues/20156#issuecomment-468686933

<!---
### Angular 4.x.x

It is not working out of the box (the default is either JIT or AOT, not both), but the apps become 10 folds faster. The ``@ngtools/webpack`` is AOT and the ```awesome-typescript-loader``` is JIT only. 
  
The solution can be architect with the ```@angular/compiler``` and the ```awesome-typescript-loader``` together. A miracle!

Example here (since I am using Angular 5 not, it is not AOT + JIT anymore, but if you are on Angular 4, you can do it):
[More info about AOT + JIT](https://corifeus.com/github/corifeus-builder-angular/artifacts/readme/skeleton.html)

-->

### Size
If you want very small bundle, use ```gzip```.

[//]: #@corifeus-footer

---

# 🌐 Meet Assistant SaaS — meeting.corifeus.com

Don't want to install anything? Try the **hosted version** at **[meeting.corifeus.com](https://meeting.corifeus.com)** — full meeting workflow built for European businesses, no setup, no API key, no command line.

What the hosted version offers:

- **21-language live translation** during the meeting
- **AI summaries, action items, decisions, attendees, key quotes** auto-generated after every meeting
- **Custom vocabulary** — your client / company / industry terms corrected automatically (Pro+ tier)
- **Searchable meeting library** — find any decision or promise across all your past meetings
- **Shareable read-only links** — send a clean meeting summary to a client or teammate, no signup needed on their end
- **One-click email summary** after each meeting
- **Premium engine on every plan** — no downgraded model, ever
- **EU billing** — Stripe Tax + VAT-compliant + EUR-priced (Solo €19.99 / Pro €39.99 / Business €99.99 per month, no lock-in)
- **GDPR-compliant by default** — browser-language auto-detection, no tracking cookies, your meetings stored encrypted

Try the live demo (1 minute free, no signup) or browse the **public sample meeting** at [meeting.corifeus.com/sample](https://meeting.corifeus.com/sample).

---

# Corifeus Network

AI-powered network & email toolkit — free, no signup.

**Web** · [network.corifeus.com](https://network.corifeus.com)  **MCP** · [`npm i -g p3x-network-mcp`](https://www.npmjs.com/package/p3x-network-mcp)

- **AI Network Assistant** — ask in plain language, get a full domain health report
- **Network Audit** — DNS, SSL, security headers, DNSBL, BGP, IPv6, geolocation in one call
- **Diagnostics** — DNS lookup & global propagation, WHOIS, reverse DNS, HTTP check, my-IP
- **Mail Tester** — live SPF/DKIM/DMARC + spam score + AI fix suggestions, results emailed (localized)
- **Monitoring** — TCP / HTTP / Ping with alerts and public status pages
- **MCP server** — 17 tools exposed to Claude Code, Codex, Cursor, any MCP client
- **Install** — `claude mcp add p3x-network -- npx p3x-network-mcp`
- **Try** — *"audit example.com"*, *"why do my emails land in spam? test me@example.com"*
- **Source** — [patrikx3/network](https://github.com/patrikx3/network) · [patrikx3/network-mcp](https://github.com/patrikx3/network-mcp)
- **Contact** — [patrikx3.com](https://www.patrikx3.com/en/front/contact) · [donate](https://paypal.me/patrikx3)

---

## ❤️ Support Our Open-Source Project  
If you appreciate our work, consider ⭐ starring this repository or 💰 making a donation to support server maintenance and ongoing development. Your support means the world to us—thank you!  

---

### 🌍 About My Domains  
All my domains, including [patrikx3.com](https://patrikx3.com), [corifeus.eu](https://corifeus.eu), and [corifeus.com](https://corifeus.com), are developed in my spare time. While you may encounter minor errors, the sites are generally stable and fully functional.  

---

### 📈 Versioning Policy  
**Version Structure:** We follow a **Major.Minor.Patch** versioning scheme:  
- **Major:** 📅 Corresponds to the current year.  
- **Minor:** 🌓 Set as 4 for releases from January to June, and 10 for July to December.  
- **Patch:** 🔧 Incremental, updated with each build.  

**🚨 Important Changes:** Any breaking changes are prominently noted in the readme to keep you informed.


[**P3X-ANGULAR-COMPILE**](https://corifeus.com/angular-compile) Build v2026.4.107

 [![NPM](https://img.shields.io/npm/v/p3x-angular-compile.svg)](https://www.npmjs.com/package/p3x-angular-compile)  [![Donate for PatrikX3 / P3X](https://img.shields.io/badge/Donate-PatrikX3-003087.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QZVM4V6HVZJW6)  [![Contact Corifeus / P3X](https://img.shields.io/badge/Contact-P3X-ff9900.svg)](https://www.patrikx3.com/en/front/contact) [![Like Corifeus @ Facebook](https://img.shields.io/badge/LIKE-Corifeus-3b5998.svg)](https://www.facebook.com/corifeus.software)





[//]: #@corifeus-footer:end
