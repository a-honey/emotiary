export const generateRandomPassowrd = () : string => {
    // 생성할 비밀번호의 길이를 설정합니다.
    const length = 10;
    // 사용할 문자셋(문자의 집합)을 정의합니다.
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // 생성된 무작위 비밀번호를 저장할 변수를 초기화합니다.
    let randomPassword = '';

    // 비밀번호의 길이만큼 반복하여 무작위 문자를 선택하여 비밀번호를 생성합니다.
    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomPassword += charset[randomIndex];
    }

    return randomPassword;
}