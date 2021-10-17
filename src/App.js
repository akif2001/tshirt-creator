import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import 'fabric-webpack';

import './App.css';

import DesignCanvas from './DesignCanvas';
import Rect from './Rect';
import Circle from './Circle';
import Image from './Image';
import StillImage from './StillImage';
import Text from './Text';

const App = () => {

  const [text, setText] = useState("ISTANBUL");

  return (
    <div>
      <DesignCanvas>
        <StillImage url="https://static.turbosquid.com/Preview/2017/03/28__05_58_55/R.jpgAB622020-C48F-448F-8D69-85F1CBE18AADLarge.jpg" />
        <Circle radius={50} />
        <Rect top={100} radius={100} fill="blue" />
        <Image url="https://ae01.alicdn.com/kf/Hfce1b732f9814b38801ffaeba183fe926/Kad-n-y-z-ya-l-boya-modern-sanat-tuval-bask-posteri-duvar-resimleri-yatak-odas.jpg_q50.jpg" scale={0.2} top={150} />
        <Text text={text} />
      </DesignCanvas>
    </div>
  );
}

export default App;
