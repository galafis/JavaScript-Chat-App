# JavaScript-Chat-App

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-green.svg?style=for-the-badge)

**Real-time Chat Application**

*Modern JavaScript application built with Node.js and Express*

[🇺🇸 English](#english) | [🇧🇷 Português](#português)

</div>

---

## 🇺🇸 English

### 📋 Overview

Real-time Chat Application developed with modern JavaScript technologies and industry best practices. This project showcases advanced Node.js development skills, Express.js framework expertise, and professional web development techniques.

### ✨ Key Features

• Real-time messaging with WebSocket
• User authentication and authorization
• Private and group chat rooms
• File sharing capabilities
• Message encryption
• Emoji and reaction support
• Online status indicators
• Message history and search

### 🛠️ Technology Stack

- **Node.js 18+** - JavaScript runtime environment
- **Express.js 4.18+** - Fast, unopinionated web framework
- **ES2022+** - Modern JavaScript features
- **NPM** - Package management
- **Nodemon** - Development auto-restart
- **Jest** - Testing framework (optional)

### 🚀 Quick Start

#### Prerequisites
- Node.js 18 or higher
- npm 8 or higher
- Code editor (VS Code recommended)

#### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/galafis/JavaScript-Chat-App.git
   cd JavaScript-Chat-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start production server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`
   - API endpoints available at: `http://localhost:3000/api`

### 📖 Usage Examples

#### API Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Main API endpoint
curl http://localhost:3000/api/v1/status

# Get application info
curl -H "Content-Type: application/json" http://localhost:3000/api/v1/info
```

#### Environment Configuration

Create a `.env` file in the root directory:

```env
# Server configuration
PORT=3000
NODE_ENV=development

# Database configuration (if applicable)
DATABASE_URL=mongodb://localhost:27017/myapp

# API Keys (if applicable)
API_KEY=your_api_key_here
```

### 🏗️ Project Structure

```
JavaScript-Chat-App/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
├── public/
├── package.json
├── index.js
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

### 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### 📦 Building for Production

```bash
# Install production dependencies only
npm ci --only=production

# Start production server
NODE_ENV=production npm start

# Using PM2 for production
npm install -g pm2
pm2 start index.js --name "JavaScript-Chat-App"
```

### 🐳 Docker Support

```bash
# Build Docker image
docker build -t JavaScript-Chat-App .

# Run container
docker run -p 3000:3000 JavaScript-Chat-App

# Using docker-compose
docker-compose up -d
```

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 👨‍💻 Author

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-lafis)

---

## 🇧🇷 Português

### 📋 Visão Geral

Real-time Chat Application desenvolvido com tecnologias JavaScript modernas e melhores práticas da indústria. Este projeto demonstra habilidades avançadas de desenvolvimento Node.js, expertise no framework Express.js e técnicas profissionais de desenvolvimento web.

### ✨ Principais Funcionalidades

• Real-time messaging with WebSocket
• User authentication and authorization
• Private and group chat rooms
• File sharing capabilities
• Message encryption
• Emoji and reaction support
• Online status indicators
• Message history and search

### 🛠️ Stack Tecnológica

- **Node.js 18+** - Ambiente de execução JavaScript
- **Express.js 4.18+** - Framework web rápido e minimalista
- **ES2022+** - Recursos modernos do JavaScript
- **NPM** - Gerenciamento de pacotes
- **Nodemon** - Reinicialização automática em desenvolvimento
- **Jest** - Framework de testes (opcional)

### 🚀 Início Rápido

#### Pré-requisitos
- Node.js 18 ou superior
- npm 8 ou superior
- Editor de código (VS Code recomendado)

#### Instalação e Configuração

1. **Clone o repositório**
   ```bash
   git clone https://github.com/galafis/JavaScript-Chat-App.git
   cd JavaScript-Chat-App
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Inicie o servidor de produção**
   ```bash
   npm start
   ```

5. **Acesse a aplicação**
   - Abra seu navegador e navegue para: `http://localhost:3000`
   - Endpoints da API disponíveis em: `http://localhost:3000/api`

### 📖 Exemplos de Uso

#### Endpoints da API

```bash
# Verificação de saúde
curl http://localhost:3000/health

# Endpoint principal da API
curl http://localhost:3000/api/v1/status

# Obter informações da aplicação
curl -H "Content-Type: application/json" http://localhost:3000/api/v1/info
```

### 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

### 📦 Build para Produção

```bash
# Instalar apenas dependências de produção
npm ci --only=production

# Iniciar servidor de produção
NODE_ENV=production npm start

# Usando PM2 para produção
npm install -g pm2
pm2 start index.js --name "JavaScript-Chat-App"
```

### 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/funcionalidade-incrivel`)
3. Commit suas mudanças (`git commit -m 'Adiciona funcionalidade incrível'`)
4. Push para a branch (`git push origin feature/funcionalidade-incrivel`)
5. Abra um Pull Request

### 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 👨‍💻 Autor

**Gabriel Demetrios Lafis**
- GitHub: [@galafis](https://github.com/galafis)
- LinkedIn: [Gabriel Demetrios Lafis](https://linkedin.com/in/gabriel-lafis)

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

**🚀 Desenvolvido com ❤️ por Gabriel Demetrios Lafis**

</div>
