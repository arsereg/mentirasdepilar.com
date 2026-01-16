# Mentiras de Pilar Cisneros

Registro documentado de declaraciones falsas de la diputada Pilar Cisneros de Costa Rica, con fuentes verificables de medios reconocidos.

## Descripcion

Esta aplicacion web presenta mas de 55 declaraciones falsas documentadas de la diputada Pilar Cisneros, cada una respaldada por al menos dos fuentes independientes de medios costarricenses reconocidos incluyendo:

- **Doble Check (UCR)** - Proyecto de verificacion de hechos de la Universidad de Costa Rica
- **La Nacion** - Periodico nacional
- **CRHoy** - Portal de noticias
- **Tico Times** - Periodico en ingles de Costa Rica
- **Observador CR** - Portal de analisis politico
- **Teletica** - Canal de television nacional
- **Freedom House** - Organizacion internacional de derechos
- **Human Rights Watch** - Organizacion de derechos humanos

## Categorias de Falsedades

Las declaraciones estan categorizadas en:

- **Economia** - Datos economicos falsos (inflacion, empleo, crecimiento)
- **Salud** - Declaraciones sobre CCSS y sistema de salud
- **Corrupcion** - Negaciones de acusaciones documentadas
- **Promesas** - Compromisos de campana incumplidos
- **Estadisticas** - Numeros y datos incorrectos
- **Otros** - Ataques a prensa, instituciones, etc.

## Tecnologias

- **React 18** - Framework de UI
- **Vite** - Build tool
- **Tailwind CSS 3.4** - Framework de estilos
- **Framer Motion** - Animaciones fluidas

## Instalacion

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/mentirasdepilar.com.git
cd mentirasdepilar.com

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para produccion
npm run build

# Previsualizar build de produccion
npm run preview
```

## Uso

### Navegacion

- **Flechas izquierda/derecha** - Navegar entre mentiras
- **Barra espaciadora** - Mentira aleatoria
- **Botones en pantalla** - Anterior, Siguiente, Aleatorio
- **Panel de filtros** - Filtrar por categoria y gravedad

### Compartir

Cada mentira tiene un enlace unico que se puede compartir:
```
https://mentirasdepilar.com/?lie=15
```

### Caracteristicas

- Auto-avance cada 30 segundos (pausa al pasar el mouse)
- Fondo animado con particulas
- Diseño responsivo (mobile-first)
- Modo offline (datos embebidos)
- Transiciones suaves entre mentiras

## Estructura del Proyecto

```
mentiras-pilar/
├── src/
│   ├── components/
│   │   ├── App.jsx           # Componente principal
│   │   ├── Background.jsx    # Fondo animado
│   │   ├── Header.jsx        # Encabezado con contador
│   │   ├── LieDisplay.jsx    # Visualizacion de mentira
│   │   ├── Navigation.jsx    # Controles de navegacion
│   │   ├── FilterPanel.jsx   # Panel de filtros
│   │   ├── ShareButton.jsx   # Boton de compartir
│   │   └── SourceLinks.jsx   # Enlaces a fuentes
│   ├── data/
│   │   └── lies.json         # Base de datos de mentiras
│   ├── hooks/
│   │   └── useLieNavigation.js # Logica de navegacion
│   ├── styles/
│   │   └── globals.css       # Estilos globales
│   └── utils/
│       └── filters.js        # Utilidades de filtrado
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Datos

El archivo `src/data/lies.json` contiene todas las mentiras documentadas con la siguiente estructura:

```json
{
  "id": 1,
  "statement": "La declaracion falsa exacta en español",
  "statementEN": "English translation",
  "context": "Contexto de cuando/donde se dijo",
  "date": "YYYY-MM-DD",
  "category": "economy|health|corruption|promises|statistics|other",
  "truth": "La verdad documentada con hechos",
  "sources": [
    {
      "name": "Nombre de la fuente",
      "url": "https://enlace-directo",
      "type": "news|official_document|video|audio",
      "accessDate": "YYYY-MM-DD"
    }
  ],
  "severity": "minor|moderate|major|critical",
  "relatedParty": "PPSD|personal|cabinet"
}
```

## Consideraciones Eticas

- Solo se incluyen falsedades verificables y documentadas
- Cada afirmacion tiene al menos 2 fuentes independientes
- Las fuentes son de medios reconocidos de Costa Rica
- Se presenta la informacion de manera neutral - los hechos hablan
- No se incluyen especulaciones ni afirmaciones sin verificar
- Este es un trabajo de periodismo y rendicion de cuentas

## Licencia

Este proyecto es de codigo abierto con fines educativos y de transparencia democratica.

## Contribuir

Para agregar nuevas mentiras documentadas:

1. Asegurar que haya al menos 2 fuentes independientes
2. Las fuentes deben ser de medios reconocidos
3. Incluir fecha exacta cuando sea posible
4. Categorizar apropiadamente
5. Abrir un Pull Request con la documentacion

---

*"La democracia muere en la oscuridad"* - Este proyecto busca iluminar la verdad.
