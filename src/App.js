import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
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
  const [isSelectedText, setIsSelectedText] = useState(false);

  const myRef = useCallback(node => {
    if (node !== null) {
      console.log("calisiyo:", node.state.isShowButtons);

      setIsSelectedText(node.state.isShowButtons);
      console.log("true mu false mu:", isSelectedText);
    }
  });

  useEffect(() => {
      window.addEventListener('object:selected', myRef);

      /*return () => {
        window.removeEventListener('object:selected', myRef);
      }*/
    
      window.addEventListener('selection:cleared', myRef);

      /*return () => {
        window.removeEventListener('selection:cleared', myRef);
      }*/
  });

  return (
    <div>
      <div>
        {isSelectedText ?
          <button>Düzenle</button>
          :
          null}
      </div>

      <DesignCanvas>
        <StillImage url="https://static.turbosquid.com/Preview/2017/03/28__05_58_55/R.jpgAB622020-C48F-448F-8D69-85F1CBE18AADLarge.jpg" />
        <Circle radius={50} />
        <Rect top={100} radius={100} fill="blue" />
        <Image url="https://ae01.alicdn.com/kf/Hfce1b732f9814b38801ffaeba183fe926/Kad-n-y-z-ya-l-boya-modern-sanat-tuval-bask-posteri-duvar-resimleri-yatak-odas.jpg_q50.jpg" scale={0.2} top={150} />
        <Text text={text} ref={myRef} />
      </DesignCanvas>
    </div>
  );
}

export default App;
