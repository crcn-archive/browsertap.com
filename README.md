### BrowserTap

Fast and interactive cross-browser testing. Instant access to desktop browsers. No installs, no fuss.

### Structure

```
server/ - server
  logger.js - global logger
  index.js - main entry point for CLI
  config.js - app config
  packages/ - all apps
    common/ - used amongst all apps
    app/ - front-end / api application
    website/ - website
    provision/ - provisions instances - launches them
```

### Installation

```bash
git clone git@github.com:crcn/browsertap.com.git
cd browsertap.com
npm install
```

### Running

```bash
npm run app-dev # run app in dev monde
npm run provision-dev # run provisioner in dev mode
npm run website-dev # run website in dev mode
```


### Resources

Installing libvpx + ffmpeg: http://wiki.webmproject.org/ffmpeg/building-with-libvpx

native -> browser webrtc: http://sourcey.com/webrtc-native-to-browser-video-streaming-example/
