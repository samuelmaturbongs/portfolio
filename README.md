# Portfolio Responsive Complete
## [Watch it on youtube](https://youtu.be/AKNvTxWOdKw)
### Portfolio Responsive Complete

- Responsive Personal Portfolio Website HTML CSS & JavaScript.
- Contains animations when scrolling.
- Smooth scrolling in each section.
- Developed first with the Mobile First methodology, then for desktop.
- Compatible with all mobile devices and with a beautiful and pleasant user interface.

💙 Join the channel to see more videos like this. [Bedimcode](https://www.youtube.com/@Bedimcode)

![preview img](/preview.png)


## Run locally

Requires Node.js 22.12+.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The home page contains a draggable React Three Fiber / Rapier lanyard using Samuel's portrait. Pause motion (or the system reduced-motion setting) displays the static portrait. A static portrait also remains available while 3D loads or if WebGL fails.

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/`. All four HTML pages are included in the build.

### Lanyard assets

`src/Lanyard.jsx` is adapted from the supplied React Bits component. The card model and strap texture in `src/assets/lanyard/` come from [React Bits](https://github.com/DavidHDev/react-bits/tree/main/src/assets/lanyard). Change `frontImage`, `backImage`, `imageFit`, `lanyardImage`, or `lanyardWidth` in `src/main.jsx` to customize it.
