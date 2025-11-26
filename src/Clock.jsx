import { useState, useEffect, useRef } from 'react';

/**
 * Clock 컴포넌트s
 *
 * 실시간 시계를 표시하고 사용자가 시계를 시작하거나 정지할 수 있는 React 함수형 컴포넌트입니다.
 * 시간은 "시", "분", "초"로 나뉘어 표시됩니다.
 *
 * 주요 기능:
 * - 현재 시간을 "HH:mm:ss" 형식으로 표시합니다.
 * - 시계가 실행 중일 때 매초마다 시간을 업데이트합니다.
 **/
function Clock() {
  const [time, setTime] = useState(new Date());

  const [isRunning, setIsRunning] = useState(true);

  const handleTimerToggle = () => {
    setIsRunning((prev) => !prev);
  };
  const intervalRef = useRef(null);
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const timeString = time.toLocaleTimeString('ko-KR');
  const [hour, minute, second] = timeString.split(':');

  return (
    <div className="timer-container">
      <div className="time-display">
        <span>{hour}</span>
        <span>{minute}</span>
        <span>{second}</span>
      </div>
      <button onClick={handleTimerToggle}>{isRunning ? '타이머 정지' : '타이머 시작'}</button>
    </div>
  );
}

export default Clock;
