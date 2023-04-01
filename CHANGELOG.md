# Changelog
All notable changes to this project will be documented in this file. See [conventional commits](https://www.conventionalcommits.org/) for commit guidelines.

- - -
## 1.0.0 - 2023-04-01
### Notable Changes
- Switch to tRPC
#### Bug Fixes
- **(SingleResult)** add "break-all" class to link element - (d7fca87) - tfkhdyt
- **(exceptions)** change error code from UNAUTHORIZED to FORBIDDEN in UnauthorizedError - (aabfdf3) - tfkhdyt
- **(hooks.server.ts)** add type import for Adapter from '@auth/core/adapters' and cast PrismaAdapter to Adapter in SvelteKitAuth options - (1693bd5) - tfkhdyt
- **(link.service.ts)** add check for old and new slug being different in updateLinkBySlug method. Add error handling for slug availability check. Add BadRequestError import. - (cf222f8) - tfkhdyt
- **(link.service.ts)** change UnauthorizedError to UnauthenticatedError - (e9bc98a) - tfkhdyt
- **(page-server)** fix unsigned in user meet internal server error page - (4d370ed) - tfkhdyt
- **(root-page)** make search feature case insensitive - (b869d49) - tfkhdyt
#### Features
- **(+page.server.ts)** import reflect-metadata package to enable decorators usage - (693efb8) - tfkhdyt
- **(NotFoundError.ts)** add NotFoundError class that extends BaseError class - (979ee20) - tfkhdyt
- **(client.ts)** add SuperJSON as a transformer for trpc client requests - (7c999b3) - tfkhdyt
- **(exceptions)** add custom error classes for BadRequest, InternalServerError, and UnauthorizedError - (0076d1a) - tfkhdyt
- **(inversify.container.ts)** import reflect-metadata package - (309e4e2) - tfkhdyt
- **(link-repository)** add deleteLinkBySlug method to LinkRepository interface - (bbd7b9f) - tfkhdyt
- **(link.service.ts)** add deleteLinkBySlug method to ILinkService and LinkService classes - (4d866b3) - tfkhdyt
- **(middleware.ts)** add auth middleware to check if user is authenticated and throw an error if not - (949ccf7) - tfkhdyt
- **(package.json)** add superjson package to dependencies - (f10976d) - tfkhdyt
- **(package.json)** add @trpc/client, @trpc/server, and trpc-sveltekit dependencies - (559ffad) - tfkhdyt
- **(router.ts)** add check for user authentication before deleting a link by slug. If user is not authenticated, throw an error with code 'UNAUTHORIZED' and message 'You should sign in first'. - (aa27152) - tfkhdyt
- **(router.ts)** add deleteLink procedure to router with input validation using zod - (3e23417) - tfkhdyt
- **(router.ts)** add createLink mutation to router with input validation and error handling - (b0c707e) - tfkhdyt
- **(trpc)** add updateLink router - (5aa0afe) - tfkhdyt
- **(trpc)** add trpc-sveltekit to handle server-side requests - (4e201e6) - tfkhdyt
- setup svelte-seo - (fae1fd2) - tfkhdyt
#### Miscellaneous Chores
- **(package.json)** update devDependencies to latest versions - (a322422) - tfkhdyt
- **(pnpm-lock.yaml)** regenerate lock file for pnpm v8 - (c4bdb60) - tfkhdyt
- **(svelte.config.js)** add $exceptions path alias to svelte config file - (b8875ff) - tfkhdyt
#### Refactoring
- **(+page.server.ts)** use trpc router and context to get link by slug and handle errors with TRPCError class - (d97edd4) - tfkhdyt
- **(+page.server.ts)** remove unused imports and actions from page server route - (757d3ee) - tfkhdyt
- **(+page.svelte)** remove unused errors variable - (6cb914f) - tfkhdyt
- **(+page.svelte)** use trpc client to create a link and invalidate links cache on success - (4474912) - tfkhdyt
- **(DeleteModal.svelte)** remove unused import of deleteLink from utils.ts - (0e759c8) - tfkhdyt
- **(edit-page)** change update method from action to trpc - (bb1bddb) - tfkhdyt
- **(edit-server)** directly return trpc value - (d54be11) - tfkhdyt
- **(edit-server)** implement trpc route to edit data - (caaad6c) - tfkhdyt
- **(link-repository)** change updateLinkBySlug return type from Error to BaseError - (25c8335) - tfkhdyt
- **(link-repository)** change Error to BaseError in LinkRepository interface - (ab6e21e) - tfkhdyt
- **(link.service.ts)** simplify getAllLinks and getLinkBySlug methods by returning the result of linkRepo methods directly - (5320188) - tfkhdyt
- **(link.service.ts)** change Error type to BaseError type in getLinkBySlug method signature - (c56216e) - tfkhdyt
- **(link.service.ts)** change return type of createLink and getAllLinks methods to use BaseError instead of Error - (715c67f) - tfkhdyt
- **(link.service.ts)** use logical OR instead of nullish coalescing operator in createLink method - (fb1a048) - tfkhdyt
- **(linkPostgres.repository.ts)** change Error to BaseError in verifySlugOwnership and deleteLinkBySlug methods - (667b93a) - tfkhdyt
- **(linkPostgres.repository.ts)** change Error to BaseError in LinkRepositoryPostgres class methods - (96decc6) - tfkhdyt
- **(page)** move page load function from +page.ts to +page.server.ts - (bdf4774) - tfkhdyt
- **(page)** remove server-side code and replace with client-side code - (9f72a01) - tfkhdyt
- **(router.ts)** import Link type from @prisma/client - (5f39899) - tfkhdyt
- **(router.ts)** move t variable to a separate file - (67f932e) - tfkhdyt
- **(utils.ts)** use trpc client to delete link and handle errors with TRPCClientError - (4e951d8) - tfkhdyt

- - -

## 0.4.0 - 2023-03-29
#### Bug Fixes
- **(404-page)** reduce text size - (a885d2d) - tfkhdyt
- **(SingleResult)** adjust link and slug layout - (e76920f) - tfkhdyt
- **(cta)** reduce font size for mobile - (bf19333) - tfkhdyt
- **(cta)** show cta buttons only for not yet signed in user - (df86a4b) - tfkhdyt
- **(edit)** redirect to /{slug} is slug is not found - (7338f71) - tfkhdyt
- **(home)** disable taintedMessage on superForm - (b4675a3) - tfkhdyt
- **(link-postgres)** change getLinkBySlug error handling - (4bd6067) - tfkhdyt
- **(page-server)** don't return fail() if error - (3c6d17b) - tfkhdyt
- **(root-page)** change link input field - (5b01c84) - tfkhdyt
- **(root-page)** reduce input field size - (33cf5f8) - tfkhdyt
- **(root-page)** show search bar when data is more than 0 - (3494ae8) - tfkhdyt
- **(root-page)** make search bar and sort field responsive - (ea68a4b) - tfkhdyt
- **(sign-in-button)** reduce font weight to medium - (39973ba) - tfkhdyt
- **(single-result)** fix button group by removing anchor tag - (25e90c3) - tfkhdyt
- **(singleResult)** add hyphens-auto to url - (2f7958a) - tfkhdyt
- **(slug-page)** change data type to PageData - (e514a09) - tfkhdyt
- remove facebook oauth - (bb4b347) - tfkhdyt
#### Build system
- **(deps)** update dependencies - (4740ebb) - tfkhdyt
- **(deps)** remove unneeded dependency - (440220f) - tfkhdyt
#### Documentation
- add README - (bc47859) - tfkhdyt
#### Features
- **(auth)** add facebook provider - (88c62f4) - tfkhdyt
- **(auth)** add google provider - (a4868d1) - tfkhdyt
- **(edit)** add memo state for link, created, and updated date - (8a18b71) - tfkhdyt
- **(edit-page)** add validation for same old and new slug - (accb38b) - tfkhdyt
- **(edit-page)** add placeholder to slug input field - (9cbb4a1) - tfkhdyt
- **(env)** add GOOGLE_ID and GOOGLE_SECRET - (27a9c27) - tfkhdyt
- **(fonts)** set font to Poppins - (b3931a7) - tfkhdyt
- **(header)** change icon and add more horizontal padding - (8f77c64) - tfkhdyt
- **(page)** change favicon - (b49a65e) - tfkhdyt
- **(page)** add edit page - (8dc94ee) - tfkhdyt
- **(page)** add page transition - (6ea87fb) - tfkhdyt
- **(root-page)** add placeholder to select input - (37b43a8) - tfkhdyt
- **(root-page)** add sort feature - (8f87e88) - tfkhdyt
- **(root-page)** add search feature - (ad0bfb6) - tfkhdyt
- **(root-page)** show more toast on success and error - (a99acc8) - tfkhdyt
- **(single-result)** show updated date - (cb2b4a8) - tfkhdyt
- add "update slug" feature - (cb1ee41) - tfkhdyt
#### Miscellaneous Chores
- add privacy policy - (0a17e23) - tfkhdyt
#### Refactoring
- **(root-page)** create filteredData state - (f3aadaf) - tfkhdyt
- **(single-result)** move autoAnimate to outer element - (1b8f12b) - tfkhdyt
- **(tailwind)** remove line clamp plugin - (28fdbcd) - tfkhdyt
#### Style
- **(edit-page)** add empty line between date and submit button - (321f973) - tfkhdyt

- - -

## 0.3.0 - 2023-03-27
#### Build system
- **(deps)** update dependencies - (b9264e8) - tfkhdyt
- **(deps)** install inversify - (fac60fc) - tfkhdyt
#### Features
- **(container)** setup DI container with inversify - (8368cbc) - tfkhdyt
- **(routes)** implement DI container - (28a53ff) - tfkhdyt
- add getLinkBySlug() - (e3ab670) - tfkhdyt
#### Refactoring
- **(signin)** create component for sign in buttons - (ec9e3b0) - tfkhdyt

- - -

## 0.2.0 - 2023-03-26
#### Features
- **(delete)** add confirmation modal before deleting link - (2f63c0f) - tfkhdyt
- **(root-page)** reset form if success - (1166e27) - tfkhdyt
- **(signin-page)** change login button style - (faa40f2) - tfkhdyt
#### Miscellaneous Chores
- **(tailwind)** add line clamp plugin - (e7be3ad) - tfkhdyt

- - -

## 0.1.1 - 2023-03-25
#### Bug Fixes
- **(link-postgres)** change updated at property from snake case to camelCase - (81ef861) - tfkhdyt
- **(root-page)** change created at property from snake_case to camelCase - (ff6f629) - tfkhdyt
#### Refactoring
- **(model)** add model name mapping, change created_at to createdAt - (91a3801) - tfkhdyt

- - -

## 0.1.0 - 2023-03-25
#### Bug Fixes
- **(actions)** add message to every fail() - (92a0996) - tfkhdyt
- **(alert)** use clsx for conditional class - (860f8bc) - tfkhdyt
- **(api)** fix db import path - (f6b36a7) - tfkhdyt
- **(card)** set w-[32rem] to md breakpoint - (734a2c5) - tfkhdyt
- **(cta)** set dark text color - (619371f) - tfkhdyt
- **(cta)** remove margin bottom - (9599609) - tfkhdyt
- **(header)** change sign in icon - (a81088c) - tfkhdyt
- **(header)** remove DropdownDivider from Account dropdown - (8a5a0d6) - tfkhdyt
- **(header)** change currentPath state to reactive state - (9db5ad0) - tfkhdyt
- **(hooks)** fix db import path - (f059353) - tfkhdyt
- **(hooks)** comment out session property in SvelteKitAuth - (f2e5dc6) - tfkhdyt
- **(layout)** disable auto-animate in layout - (853d320) - tfkhdyt
- **(link-entity)** change url validation message to 'Invalid URL' - (6230632) - tfkhdyt
- **(mylinks)** don't show table if links is empty - (bb611c8) - tfkhdyt
- **(page-server)** change LinkRepoPostgres import path - (8438f08) - tfkhdyt
- **(page-server)** order link by updated_date descending - (7272c79) - tfkhdyt
- **(redirect-page-server)** fix db import path - (1c90a71) - tfkhdyt
- **(root-page)** fix result animation - (5c71f23) - tfkhdyt
- **(root-page)** move use:autoAnimate out of data.links checking - (185f308) - tfkhdyt
- **(server-hooks)** add workaround for auth providers - (c588900) - tfkhdyt
- **(signin)** remove outline attr from google signin button - (a3637f5) - tfkhdyt
- **(signin)** change sign in button color - (21909f8) - tfkhdyt
- **(single-result)** reduce duration to 100 - (5ec825e) - tfkhdyt
- **(single-result)** adjust gap on medium breakpoint - (976fac3) - tfkhdyt
- **(single-result)** adjust layout - (ca91052) - tfkhdyt
- **(single-result)** add "copy-button-" prefix to copy button id - (979c8bc) - tfkhdyt
#### Build system
- **(deps)** install flowbite-svelte-blocks - (dbbc43e) - tfkhdyt
- **(deps)** install dayjs - (d988e71) - tfkhdyt
- **(deps)** install svelte-french-toast - (3d06c6d) - tfkhdyt
- **(deps)** uninstall tailwind forms and typography, move flowbite to devDependencies - (7578157) - tfkhdyt
- **(deps)** install auto-animate - (52f1e31) - tfkhdyt
- **(deps)** install flowbite-svelte - (12b3c88) - tfkhdyt
- **(deps)** update major update deps - (322170b) - tfkhdyt
- **(deps)** update minor update deps - (f4a26b5) - tfkhdyt
- **(deps)** remove svelte-simple-modal - (bea467b) - tfkhdyt
- **(deps)** install svelte-simple-modal - (171158b) - tfkhdyt
- **(deps)** install prisma adapter - (d34873c) - tfkhdyt
- **(deps)** install auth.js - (6791f00) - tfkhdyt
- **(deps)** install clsx - (a572141) - tfkhdyt
- **(deps)** uninstall pico - (d4db5bf) - tfkhdyt
- **(deps)** install prisma and pico - (cc9c351) - tfkhdyt
#### Features
- **(api)** add endpoint to delete link - (4007ea7) - tfkhdyt
- **(card)** add customClass prop - (f7d6ca0) - tfkhdyt
- **(dto)** add CreateLinkRequest dto - (12e6499) - tfkhdyt
- **(header)** add sign out icon next to sign out button - (b4c1d05) - tfkhdyt
- **(header)** make username font weight in avatar become bold - (e294b0f) - tfkhdyt
- **(header)** show avatar if already signed in, show signin button if not yet - (572185e) - tfkhdyt
- **(header1)** add leading-normal class - (aa94537) - tfkhdyt
- **(hooks.server)** add adapter for prisma - (bcbebed) - tfkhdyt
- **(lib)** add prisma database - (827dc39) - tfkhdyt
- **(link-pg)** add getAllLinks() - (7bbb097) - tfkhdyt
- **(link-repo)** add verifySlugAvailability() - (e793d99) - tfkhdyt
- **(link-repo)** add LinkRepositoryPostgres - (304f265) - tfkhdyt
- **(migrations)** create folder link - (7e92d13) - tfkhdyt
- **(page)** add autoAnimate to list of links - (7ea358b) - tfkhdyt
- **(page)** show error toast - (05f79da) - tfkhdyt
- **(page)** show list of link owned by user - (9b4b21b) - tfkhdyt
- **(page)** add profile card - (be894b7) - tfkhdyt
- **(page.server)** make load() depends on 'links' - (99a72e1) - tfkhdyt
- **(prisma)** add auth tables - (ed72732) - tfkhdyt
- **(redirect-page)** improve 404 page - (879af20) - tfkhdyt
- **(repo)** add LinkRepository interface - (f5c33e7) - tfkhdyt
- **(root-layout)** add autoAnimate - (bc1ac30) - tfkhdyt
- **(root-page)** add regex validation to custom slug field - (0067f05) - tfkhdyt
- **(root-page)** hide custom slug toggle if not signed in - (33fdee0) - tfkhdyt
- **(root-page)** add error handling - (4395130) - tfkhdyt
- **(routes)** add signin page - (27c1da2) - tfkhdyt
- **(routes)** create layout.server.ts - (4c1e4c4) - tfkhdyt
- **(routes)** switch to tailwind - (dcf2ffb) - tfkhdyt
- **(routes)** add slug page - (741cb03) - tfkhdyt
- **(routes)** add main page - (f9561b2) - tfkhdyt
- **(routes)** add actions - (bca2e95) - tfkhdyt
- **(routes)** add layout - (b64aa99) - tfkhdyt
- **(schema)** make slug unique - (416e658) - tfkhdyt
- **(schema)** add Link model - (6e35191) - tfkhdyt
- **(services)** add getAllLinks() - (c5bad8d) - tfkhdyt
- **(services)** add verifySlugAvailability() - (b304a84) - tfkhdyt
- **(services)** add LinkService - (7b0d0c8) - tfkhdyt
- **(signin)** add page title and make github login button works - (24255d1) - tfkhdyt
- **(signin)** redirect to home page if already signed in - (4d77edf) - tfkhdyt
- **(single-result)** show created date - (fb1ca4d) - tfkhdyt
- **(single-result)** make delete button works - (78ac6bd) - tfkhdyt
- **(single-result)** add link to slug - (2aff683) - tfkhdyt
- **(ui)** switch to skeleton ui - (9525ac8) - tfkhdyt
- adjust all component to support dark theme - (b0c8f8d) - tfkhdyt
- add hooks.server.ts - (33361f7) - tfkhdyt
#### Miscellaneous Chores
- **(eslint)** setup unused-imports plugin - (e8631d4) - tfkhdyt
- **(eslint)** apply simple import sort plugin - (83e316c) - tfkhdyt
- **(lefthook)** add svelte-check command to pre-push - (6217dfe) - tfkhdyt
- **(lefthook)** fix eslint and prettier command, prefix it with pnpm - (f8795db) - tfkhdyt
- **(lefthook)** remove comments - (4045c27) - tfkhdyt
- **(prettier)** set trailingComma to es5 and bracketSameLine to true - (62d821b) - tfkhdyt
- **(tailwind)** set darkMode to class - (cf34991) - tfkhdyt
- **(tailwind)** set dark mode to media, remove unneeded tailwind plugins - (71acee6) - tfkhdyt
- **(tsconfig)** set baseUrl to "src" - (1a4477a) - tfkhdyt
- init lefthook - (3e23eb5) - tfkhdyt
- setup path alias - (ff76724) - tfkhdyt
- setup tailwind - (1201d6e) - tfkhdyt
- remove npmrc - (8814fff) - tfkhdyt
#### Performance Improvements
- **(signin-server)** get session from parent instead of locals - (1178d59) - tfkhdyt
#### Refactoring
- **(actions)** change fail message to 'Custom slug has been used' - (0da8b09) - tfkhdyt
- **(cta)** change buttons to flowbite-svelte components - (b6bdcbe) - tfkhdyt
- **(db)** move db from $lib to $db - (64d0467) - tfkhdyt
- **(header)** migrate to flowbite-svelte component - (425146d) - tfkhdyt
- **(layout)** remove flowbite css import - (2767e7f) - tfkhdyt
- **(link-repo)** rename linkPG to linkPostgres - (3ec59a0) - tfkhdyt
- **(link-repo)** rename postgres.ts to linkPG.repository.ts - (55bd4a8) - tfkhdyt
- **(link-repo)** remove db from LinkRepository interface - (703529c) - tfkhdyt
- **(links-api)** change key to slug - (e83ed30) - tfkhdyt
- **(page)** move linkSchema to $entities - (53d1a70) - tfkhdyt
- **(page-server)** implement linkService.getAllLInks() - (90f4a84) - tfkhdyt
- **(page-server)** implement verifySlugAvailability on server actions - (5854e83) - tfkhdyt
- **(page-server)** implement LinkService and LinkRepoPostgres - (3c129e9) - tfkhdyt
- **(root-page)** add margin top to form and switch input field to flowbite-svelte component - (598e798) - tfkhdyt
- **(root-page-server)** move Actions from object type to "satisfies" - (97d8f34) - tfkhdyt
- **(single-result)** change to button group - (7a6a622) - tfkhdyt
- **(tailwind)** move tailwind setup to app.css - (fc2cc3b) - tfkhdyt
- move grid center to page from layout - (b978741) - tfkhdyt
- create alert component - (89900ce) - tfkhdyt
- create NormalButton component - (9e2a112) - tfkhdyt
- create header1 and input field components - (a62931e) - tfkhdyt
- create card component - (358e89e) - tfkhdyt
#### Style
- **(root-page)** remove unneeded import - (21c769e) - tfkhdyt
- **(slug/page.server)** format - (292b2a9) - tfkhdyt
- run format and lint - (1332413) - tfkhdyt
- format the code - (46e3aef) - tfkhdyt

- - -

Changelog generated by [cocogitto](https://github.com/cocogitto/cocogitto).
