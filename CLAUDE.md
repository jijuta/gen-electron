# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup and Dependencies
- `nvm use v14.19.1` - Switch to required Node.js version (v14+)
- `yarn` - Install dependencies
- `yarn copy:win` (Windows) or `yarn copy:mac` (macOS) - Copy app.js template file

### Development and Building
- `yarn start` - Start Electron application in development mode
- `yarn dev` - Start Quasar development server (port 9082)
- `yarn build` - Build Electron application for production
- `yarn build:pwa` - Build PWA version
- `yarn lint` - Run ESLint on source files
- `yarn test:unit` - Run Jest unit tests
- `yarn test:unit:watch` - Run Jest in watch mode
- `yarn test:unit:coverage` - Run Jest with coverage report

## Architecture Overview

This is a **Saesolsoft GenApp** - an Electron-based code generator application built with:
- **Quasar Framework v1** + Vue.js 2.7.14
- **Electron v11** for desktop application
- **AG Grid** for data tables
- **Database support**: MySQL, PostgreSQL, Oracle, MSSQL
- **Code Generation**: Spring Boot, Vue.js, JSP, Node.js templates

### Core Structure

- **Frontend**: Vue.js SPA with Quasar UI components
- **Backend Code Generation**: Node.js modules in `src/gen/`
- **Database Integration**: Multiple database connectors with Knex.js
- **Template System**: Various code generation templates for different frameworks

### Key Directories

- `src/pages/` - Main application pages (Index.vue is the primary generator interface)
- `src/gen/` - Code generation engine and templates
  - `src/gen/spring-boot/` - Spring Boot code generation templates  
  - `src/gen/tpl/` - Traditional JSP/eGov templates
  - `src/gen/config/` - Database configurations
- `src/layouts/` - Application layout components
- `src/boot/` - Quasar boot files for initialization

### Database Connection

The application connects to various databases to analyze table structures and generate corresponding code:
- Configuration files in `src/gen/config/` for different DB types
- Supports MySQL, PostgreSQL, Oracle, and MSSQL
- Uses Knex.js for database operations

### Code Generation Flow

1. Database connection and table analysis
2. Template selection (Spring Boot, Vue, JSP, etc.)
3. Code generation using template engines
4. File output to specified directories

### Authentication & Routing

- Login/logout system with localStorage-based authentication
- Route guards implemented in `src/router/routes.js`
- Main application accessible via `/gen` route after authentication

### Key Dependencies

- **Quasar**: UI framework and build system
- **Vue 2.7**: Frontend framework
- **Electron**: Desktop application wrapper  
- **AG Grid**: Data grid components
- **Knex.js**: Database query builder
- **Monaco Editor**: Code editor component