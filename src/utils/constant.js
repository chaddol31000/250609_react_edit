export const AsyncStatus = {
  IDLE : '작업 대기',
  LOADING : '읽기 작업 중',
  SUBMITTING : '쓰기 작업 중',
  SUCCESS : '작업 성공',
  FAIL : '작업 실패'
}

// 에러가 나고 있는 상태나 로딩을 하고 있는 상태나 다 똑같은 상태임
// 그래서 지금처럼 상수로 뺌