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

  const [arrayBackgroundImage, setArrayBackgroundImage] = useState([
    { backgroundImageUrl: "https://i.stack.imgur.com/OaxYU.jpg" },
  ]);

  const [text, setText] = useState("");
  const [isAddingText, setIsAddingText] = useState(false);
  const [arrayText, setArrayText] = useState([]);
  const [refText, setRefText] = useState(null);
  const [isSelectedText, setIsSelectedText] = useState(false);
  const [newText, setNewText] = useState("");
  const [newTextColor, setNewTextColor] = useState("");
  const [newTextFontFamily, setNewTextFontFamily] = useState([
    { label: "-hiçbiri-", value: "unset" },
    { label: "-moz-initial", value: "-moz-initial" },
    { label: "cursive", value: "cursive" },
    { label: "fantasy", value: "fantasy" },
    { label: "inherit", value: "inherit" },
    { label: "initial", value: "initial" },
    { label: "monospace", value: "monospace" },
    { label: "revert", value: "revert" },
    { label: "sans-serif", value: "sans-serif" },
    { label: "serif", value: "serif" },
  ]);
  const [objectSelecting, setObjectSelecting] = useState(null);

  const [url, setUrl] = useState("");
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [arrayImage, setArrayImage] = useState([]);

  const [rectWidth, setRectWidth] = useState(0);
  const [rectHeight, setRectHeight] = useState(0);
  const [rectColor, setRectColor] = useState("");
  const [isAddingRect, setIsAddingRect] = useState(false);
  const [arrayRect, setArrayRect] = useState([]);

  const [circleRadius, setCircleRadius] = useState(0);
  const [circleColor, setCircleColor] = useState("");
  const [isAddingCircle, setIsAddingCircle] = useState(false);
  const [arrayCircle, setArrayCircle] = useState([]);

  useEffect(() => {
    if (refText === null) {
      console.log("refText değeri null");
      return;
    } 
    
    console.log("refText değeri null değil");

    refText.props.canvas.on("object:selected", (e) => {
      console.log("e:", e);

      setObjectSelecting(e);

      setIsSelectedText(true);

      setNewText(refText.props.canvas.getActiveObject().text);
      setNewTextColor(refText.props.canvas.getActiveObject().fill);
      if (document.getElementById('select') !== null)
        document.getElementById('select').value = refText.props.canvas.getActiveObject().fontFamily;
    });

    refText.props.canvas.on("selection:cleared", (e) => {
      setIsSelectedText(false);

      refText.props.canvas.dirty = true;
      refText.props.canvas.renderAll();
    });

    refText.props.canvas.on('object:modified', (e) => {
      console.log("Object: Text güncellendi!");
    });

    refText.props.canvas.on('selection:updated', (e) => {
      console.log("Selection: Text güncellendi!");
    });
  });

  const mapBackgroundImage = () => {
    return arrayBackgroundImage.map((x, i) => {
      return (
        <StillImage key={i} url={x.backgroundImageUrl} />
      );
    });
  }

  const mapText = () => {
    return arrayText.map((x, i) => {
      return (
        <Text key={i} text={x.textName} ref={ref => setRefText(ref)} />
      );
    });
  }

  const onAddingText = () => {
    if (isAddingText) {
      if (text === null || text === "") return setIsAddingText(false);

      setArrayText([...arrayText, { textName: text }]);
      setIsAddingText(false);
    } else {
      setIsAddingText(true);
    }
  }

  const onAddNewText = (e) => {
    setNewText(e);

    refText.props.canvas.getActiveObject().set({
      text: newText,
    });

    refText.setState({ stateText: newText });

    refText.props.canvas.renderAll();

    console.log("refText.props.canvas.getActiveObject():", refText.props.canvas.getActiveObject());
  }

  const onAddNewTextColor = (e) => {
    setNewTextColor(e);

    refText.props.canvas.getActiveObject().set({
      fill: newTextColor,
    });

    refText.setState({ stateColor: newTextColor });

    refText.props.canvas.renderAll();

    console.log("refText (e):", refText.props.canvas.getActiveObject().originalState);
  }

  const mapNewTextFontFamily = () => {
    return newTextFontFamily.map((x, i) => {
      return (
        <option key={i} value={x.value} style={{ fontFamily: x.value }}>{x.label}</option>
      );
    });
  }

  const addNewTextFontFamily = (changedValue) => {
    refText.props.canvas.getActiveObject().set({
      fontFamily: changedValue,
    });
    
    refText.setState({ stateFontFamily: changedValue });

    console.log("refText:", refText);

    refText.props.canvas.renderAll();
  }

  const mapImage = () => {
    return arrayImage.map((x, i) => {
      return (
        <Image key={i} url={x.urlName} />
      );
    });
  }

  const onAddingImage = () => {
    if (isAddingImage) {
      if (url === null || url === "") return setIsAddingImage(false);

      setArrayImage([...arrayImage, { urlName: url }]);
      setIsAddingImage(false);
    } else {
      setIsAddingImage(true);
    }
  }

  const mapRect = () => {
    return arrayRect.map((x, i) => {
      return (
        <Rect key={i} width={x.rectWidth} height={x.rectHeight} fill={x.rectColor} />
      );
    });
  }

  const onAddingRect = () => {
    if (isAddingRect) {
      if (rectColor === null || rectColor === "") return setIsAddingRect(false);

      setArrayRect([...arrayRect, { rectColor: rectColor, rectWidth: rectWidth, rectHeight: rectHeight }])
      setIsAddingRect(false);
    } else {
      setIsAddingRect(true);
    }
  }

  const mapCircle = () => {
    return arrayCircle.map((x, i) => {
      return (
        <Circle key={i} radius={x.circleRadius} fill={x.circleFill} />
      );
    });
  }

  const onAddingCircle = () => {
    if (isAddingCircle) {
      if (circleColor === null || circleColor === "") return setIsAddingCircle(false);

      setArrayCircle([...arrayCircle, { circleRadius: circleRadius, circleFill: circleColor }]);
      setIsAddingCircle(false);
    } else {
      setIsAddingCircle(true);
    }
  }

  return (
    <div>
      <div>
        {isAddingText ?
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Eklenecek yazıyı giriniz:" />
          :
          null}
        <button onClick={() => onAddingText()}>Yazı Ekle</button>

        {isAddingImage ?
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Eklenecek resimin url adresini giriniz:" />
          :
          null}
        <button onClick={() => onAddingImage()}>Resim Ekle</button>

        {isAddingRect ?
          <div>
            <input type="number" value={rectWidth} onChange={(e) => setRectWidth(e.target.value)} placeholder="Karenin genişliği:" />
            <input type="number" value={rectHeight} onChange={(e) => setRectHeight(e.target.value)} placeholder="Karenin yüksekliği:" />
            <input type="text" value={rectColor} onChange={(e) => setRectColor(e.target.value)} placeholder="Karenin rengi (RGB veya İngilizce adlandırılması:" />
          </div>
          :
          null}
        <button onClick={() => onAddingRect()}>Kare Ekle</button>

        {isAddingCircle ?
          <div>
            <input type="number" value={circleRadius} onChange={(e) => setCircleRadius(e.target.value)} placeholder="Dairenin boyutunu giriniz:" />
            <input type="text" value={circleColor} onChange={(e) => setCircleColor(e.target.value)} placeholder="Dairenin rengi (RGB veya İngilizce adlandırılması:" />
          </div>
          :
          null}
        <button onClick={() => onAddingCircle()}>Daire Ekle</button>
      </div>

      <div>
        {isSelectedText ?
          <div>
            <input type="text" value={newText} onChange={e => onAddNewText(e.target.value)} placeholder="Değiştirmek istediğiniz yazıyı giriniz:" />
            <input type="text" value={newTextColor} onChange={e => onAddNewTextColor(e.target.value)} placeholder="Değiştirmek istediğiniz rengi giriniz:" />
            <select value={newTextFontFamily.value} onChange={e => addNewTextFontFamily(e.target.value)} id="select">
              {mapNewTextFontFamily()}
            </select>
          </div>
          :
          null}
      </div>

      <DesignCanvas>
        {mapBackgroundImage()}
        {mapText()}
        {mapImage()}
        {mapRect()}
        {mapCircle()}
      </DesignCanvas>
    </div>
  );
}

export default App;
