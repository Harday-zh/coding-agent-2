import React, { useState } from 'react';

// 初始组件代码
const initialCode = `
const Component = ({ count }) => {
  if (count >= 5) {
    return <div>Rendering stopped after 5 renders</div>;
  }
  
  return (
    <div>
      <p>Render Count: {count + 1}</p>
      <Component count={count + 1} />
    </div>
  );
};
`;

const SelfModifyingComponent = () => {
  // 使用useState来存储组件代码和渲染次数
  const [code, setCode] = useState(initialCode);
  const [count, setCount] = useState(0);
  
  // 3. 实时修改自己的源代码
  // 在每次渲染时，我们都会修改组件的源代码
  const modifiedCode = code.replace(
    /Render Count: \{count \+ 1\}/,
    `Render Count: {count + 1} (Modified ${count} times)`
  );
  
  // 更新组件代码
  setCode(modifiedCode);
  
  // 2. 5次渲染后停止
  if (count >= 5) {
    return (
      <div>
        <h2>Self Modifying Component</h2>
        <h3>Final Component Code:</h3>
        <pre>{code}</pre>
        <h3>Render Output:</h3>
        <div>Rendering stopped after 5 renders</div>
      </div>
    );
  }
  
  // 创建一个新的组件
  const NewComponent = eval(modifiedCode);
  
  // 1. 无限递归渲染
  // 4. 保持纯净：组件没有副作用，所有修改都在渲染过程中完成
  
  return (
    <div>
      <h2>Self Modifying Component</h2>
      <h3>Component Code:</h3>
      <pre>{code}</pre>
      <h3>Render Output:</h3>
      <NewComponent count={count} />
    </div>
  );
};

export default SelfModifyingComponent;