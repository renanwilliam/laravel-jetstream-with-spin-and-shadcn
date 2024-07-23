# Laravel Jetstream with Inertia.js, React, shadcn Components, and ServerSideUp Spin

This repository provides an example of integrating Laravel Jetstream with Inertia.js and React, utilizing shadcn
components for the front end, and leveraging ServerSideUp Spin for infrastructure management.

## Features

- **Laravel Jetstream**: A beautifully designed application scaffolding for Laravel.
- **Inertia.js**: A modern stack that makes it easy to build single-page apps using Laravel and React.
- **React**: A JavaScript library for building user interfaces.
- **shadcn Components**: A collection of reusable and customizable components.
- **ServerSideUp Spin**: A robust infrastructure tool to manage your Docker containers efficiently.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Docker
- Node.js and npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/renanwilliam/laravel-jetstream-with-spin-and-shadcn.git
   cd laravel-jetstream-with-spin-and-shadcn
   ```
2. **Start Docker containers:**
   Make sure Docker is running on your machine, then use Spin to start the containers:
   ```bash
   spin up -d
   ```

3. **Install dependencies:**
   Use Spin to run npm install within the Node container:
   ```bash
   spin run node npm install
   ```

4. **Start development mode:**
   Run the Vite development server:
   ```bash
   spin run node node_modules/.bin/vite --host
   ```
   If you have Node.js and NPM installed, you can use the convenience script `npm run dev-docker`

### PHP CLI Interaction

To interact with the PHP CLI for running \`composer\` or \`php artisan\` commands, start a bash session in a new PHP
container:

```bash
spin run -it php bash
```

## Documentation and Resources

- **ServerSideUp Spin**: [Spin Documentation](https://serversideup.net/open-source/spin/)
- **Laravel Jetstream**: [Jetstream Documentation](https://jetstream.laravel.com/)
- **Inertia.js**: [Inertia.js Documentation](https://inertiajs.com/)
- **React**: [React Documentation](https://reactjs.org/)
- **shadcn Components**: [shadcn Documentation](https://shadcn.dev/)

## Contributing

Feel free to submit issues and pull requests to contribute to the project. Contributions are welcome!

## License

This project is open-sourced under the [MIT license](LICENSE).
