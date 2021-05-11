// 拓展对dom节点的断言
import '@testing-library/jest-dom'
import React from "react" 
// 处理这种情况 https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
React.useLayoutEffect = React.useEffect 