import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { styled } from "styled-components";
import DataApi from '../../api/dataApi';

const UploadContainer = styled("div")({
  height: "100%",

});

const UploadContent = () => {
  const [callFlowZip, setCallFlowZip] = useState({});
  const [isCallFlowTutorialHide, setIsCallFlowTutorialHide] = useState(true);
  const onCallFlowTutorialToggle = () => {
    setIsCallFlowTutorialHide(!isCallFlowTutorialHide);
  };
  const onCallFlowChange = (evt) => {
    setCallFlowZip(evt.target.files[0]);
  };
  const onCallFlowUpload = async () => {
    const formData = new FormData();
    formData.append("file", callFlowZip);
    const response = await DataApi.uploadCallFlow(formData);
  };
  
  const [commPeakZip, setCommPeakZip] = useState({});
  const [isCommPeakTutorialHide, setIsCommPeakTutorialHide] = useState(true);
  const onCommPeakTutorialToggle = () => {
    setIsCommPeakTutorialHide(!isCommPeakTutorialHide);
  };
  const onCommPeakChange = (evt) => {
    setCommPeakZip(evt.target.files[0]);
  };
  const onCommPeakUpload = async () => {
    const formData = new FormData();
    formData.append("file", commPeakZip);
    const response = await DataApi.uploadCommPeak(formData);
  };

  return (
    <UploadContainer>
      <div>
        <h3>
          CallFlow:&nbsp;
          <input type="file" onChange={onCallFlowChange} />
          <button type="button" onClick={onCallFlowUpload}>上传</button>
          &nbsp;
          <button type="button" onClick={onCallFlowTutorialToggle}>{isCallFlowTutorialHide ? "显示" : "隐藏"} 教学</button>
        </h3>
        <Collapse isOpened={!isCallFlowTutorialHide}>
          <h2>Step 1</h2>
          <img src="/callflow_tutorial.png" />
        </Collapse >
      </div>
      <br />
      <div>
        <h3>
          CommPeak:&nbsp;
          <input type="file" onChange={onCommPeakChange} />
          <button type="button" onClick={onCommPeakUpload}>上传</button>
          &nbsp;
          <button type="button" onClick={onCommPeakTutorialToggle}>{isCommPeakTutorialHide ? "显示" : "隐藏"} 教学</button>
        </h3>
        <Collapse isOpened={!isCommPeakTutorialHide}>
          <h2>Step 1</h2>
          <img src="/commpeak_tutorial_step1.png" />
          <h2>Step 2</h2>
          <img src="/commpeak_tutorial_step2.png" />
        </Collapse>
      </div>
    </UploadContainer>
  )
};

export default UploadContent;