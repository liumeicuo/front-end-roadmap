import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import domtoimage from "dom-to-image";

import drawRoadmap from "./drawRoadmap";
import * as roadMap from "./roadmap";

const options = [
  { value: "all", label: "完整路线" },
  { value: "p1", label: "👶🏻初级路线" },
  { value: "p2", label: "👦🏻中级路线" },
  { value: "p3", label: "👨🏻高级路线" },
  //   { value: "10000", label: "👴🏻养生路线" },
];

function Index() {
  const history = useHistory();
  const [process, setProcess] = useState("all");
  useEffect(() => {
    const canvas = drawRoadmap(`roadmap-${process}`, roadMap[process]);
    canvas.on("mouse:down", (options) => {
      if (options.target && options.target.link) {
        history.push(`/guide${options.target.link}`);
      }
    });
  }, [history, process]);

  const onSelectProcess = useCallback(({ value }) => {
    setProcess(value);
  }, []);
  const onDownloadImg = useCallback(() => {
    const $el = document.querySelector(".roadmap");
    domtoimage.toJpeg($el).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "roadmap.jpeg";
      link.href = dataUrl;
      link.click();
    });
  }, []);
  return (
    <div className="roadmap-container">
      <div className="process-select-container">
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={onSelectProcess}
          placeholder="请选择"
          className="process-select"
        />
        <div className="download" onClick={onDownloadImg}>
          保存路线图
        </div>
      </div>

      <div className="roadmap">
        <div className="desc-container">
          <div className="explain-square">
            <div className="explain-content">
              <div>1. ⭐️ - 推荐使用</div>
              <div>2. ✅ - 备选方案</div>
              <div>3. ❎ - 不推荐学习（技术已过时或其他原因）</div>
              <div>
                4.
                <span className="grey-card">xxxx</span> - 需要时再学
              </div>
            </div>
          </div>
        </div>
        {process === "all" && (
          <div>
            <canvas id="roadmap-all" height="5000px" width="1000px"></canvas>
          </div>
        )}
        {process === "p1" && (
          <div>
            <canvas id="roadmap-p1" height="5000px" width="1000px"></canvas>
          </div>
        )}
        {process === "p2" && (
          <div>
            <canvas id="roadmap-p2" height="5000px" width="1000px"></canvas>
          </div>
        )}
        {process === "p3" && (
          <div>
            <canvas id="roadmap-p3" height="5000px" width="1000px"></canvas>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
