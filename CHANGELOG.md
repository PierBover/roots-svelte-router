# 0.3.1

### Fixes
* Fixed a bug in matching paths

# 0.3.0

### New features
* Added `endWithSlash` option

### Fixes
* Fixed a bug where the active class wasn't added to links

# 0.2.1

Minor fixes.

# 0.2.0

### New features
* Base path setting

# 0.1.0

Moved to new repo.

# 0.0.12

### New features
* `aria-current` value for active links.

### Breaking changes
* `class` renamed to `activeClass` in the settings for the `active` action.

# 0.0.11

### New features
* `activeClass` router configuration.

# 0.0.10

### Fixes
* `onPopState` hook bug

# 0.0.9

### New features
* `onRouteMatch` hook
* `meta` route configuration

### Breaking changes
* `Router` component renamed to `RouterView`
* Initial configuration has been decoupled from the `Router` component

# 0.0.8

### Fixes
* Bug `back()` export

# 0.0.7

### New features
* Added `link` and `active` actions
* Improved scroll management

### Breaking changes
* `push()` renamed to `navigate()`
* `Link` component deleted

### Fixes
* Resolved a bug with `blockPageScroll` and nested routes

# 0.0.6

### New features
* Moved history route state to `window.history` so that state will be preseved between refreshes
* Renamed `resetScroll` to `scrollToTop`
* Improved scroll management

### Fixes
* Fixed a bug where scroll wasn't restored when going back or forward

# 0.0.5

Query string parameters

# 0.0.4

Better implementation of nested routes.

# 0.0.3

### Fixes
* Circular imports
* `Link` optional props

# 0.0.2

Basic initial features.