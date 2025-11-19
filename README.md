
# PinPon - Solana SocialFi Video App
### Architected by Jonathan L.

## 🚀 Visión del Proyecto
PinPon es una aplicación social futurista y segura basada en Blockchain, diseñada para desafíos de video tokenizados en la red Solana. Combina el "engagement" viral de los videos cortos (estilo TikTok) con los incentivos financieros de SocialFi y la seguridad de una billetera cripto.

## 🛠 Tecnología (Tech Stack)
Este prototipo está construido con tecnología moderna lista para convertirse en App Nativa (vía Capacitor).

- **Core:** React 18 + TypeScript
- **Estilo:** Tailwind CSS (Estética Neon/Futurista)
- **Blockchain:** `@solana/web3.js`
- **IA:** Google Gemini API (Análisis de Inversión y Verificación)
- **Iconos:** Lucide React
- **Gráficos:** Recharts

## ⚡ INICIO RÁPIDO: CÓMO DESPLEGAR (Ponerla en Internet)

**Paso 1: Obtén un enlace en vivo (Gratis)**
No guardes este código en tu laptop. Súbelo a Vercel para mostrárselo a inversores/socios.
1. Crea una cuenta en [Vercel.com](https://vercel.com).
2. Instala Vercel en tu terminal: `npm i -g vercel`
3. Ejecuta el comando: `vercel`
4. Comparte el enlace generado (ej: `https://pinpon.vercel.app`).

**Paso 2: Encuentra Equipo (Comunidad en Español)**
¡Ya diste el primer paso uniéndote a Heavy Duty Builders!

- **Heavy Duty Builders:** Ya estás dentro. Usa el canal de `#general` o `#proyectos`.
- **Superteam MX (México):** 
  - Si el enlace de Discord falla, ve a Twitter: **[@SuperteamMX](https://twitter.com/SuperteamMX)**
  - El enlace correcto y actualizado siempre está en su biografía.

## 📢 Plantilla de Mensaje para Discord
*Copia y pega esto en los canales de "Busco Equipo" o "Proyectos":*

> "Hola builders 🏗️. Soy Diseñador y Fundador.
> Estoy construyendo **PinPon**, una app de 'SocialFi' en Solana (tipo TikTok pero con tokenización de videos).
>
> 📱 **Tengo el MVP visual listo:** [Pega tu enlace de Vercel aquí]
>
> Busco un **Dev de Smart Contracts (Rust)** o **React Native** que quiera unirse para aplicar al próximo Hackathon de Solana. Yo pongo el diseño, producto y estrategia. ¿Alguien interesado en ver el código?"

## 📂 Estructura del Proyecto

### 1. Frontend (Estado Actual)
- **`App.tsx`**: Controlador principal. Maneja la autenticación (Invitado vs Wallet) y la navegación.
- **`views/`**: 
  - `FeedView`: La experiencia principal de scroll de videos con capas de "Invertir" y "Prompts de IA".
  - `InvestView`: Gráficos en tiempo real e interfaz simulada de Swap ($SOL <-> $PINPON).
  - `SecurityView`: Panel de seguridad biométrica y logs de auditoría.
  - `SettingsView`: Configuración de privacidad y botón para compartir prototipo.
- **`services/solanaService.ts`**: Lógica para conectar con Phantom Wallet y consultar la Blockchain.

### 2. Backend Planeado (Necesario para Producción)
Para llevar esto a la Mainnet real:
- **Smart Contract (Rust/Anchor):** Programa para acuñar el token `$PINPON`.
- **Base de Datos (Supabase):** Para guardar perfiles de usuario fuera de la cadena.

## 📦 Instrucciones para Desarrolladores

1. **Instalar Dependencias:**
   ```bash
   npm install
   ```

2. **Correr Servidor Local:**
   ```bash
   npm run dev
   ```

3. **Construir para Móvil (Capacitor):**
   ```bash
   npm run build
   npx cap sync
   npx cap open ios  # Para Xcode (Mac)
   npx cap open android # Para Android Studio
   ```

---
*Este código es propiedad intelectual de Jonathan L.*
