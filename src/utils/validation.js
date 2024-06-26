import { jwtDecode } from 'jwt-decode';

// access token validation
export const validateToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      console.error('Token has expired');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token');
    return false;
  }
};

// validation image
export const checkIfValidImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = reader.result;
    };
    reader.onerror = () => resolve(false);
    reader.readAsDataURL(file);
  });
};

export const validationUsername = (values) => {
  const usernameLength = values.length;
  const underscoreCount = (values.match(/_/g) || []).length;
  const dotCount = (values.match(/\./g) || []).length;

  if (usernameLength < 5 || usernameLength > 13) {
    return {
      pattern: '^[a-zA-Z0-9._]{5,13}$',
      message: 'Username must be at least 5 chars and max 13 characters',
    };
  } else {
    if (underscoreCount > 1 || dotCount > 1) {
      return {
        pattern: '^[a-zA-Z0-9]$',
        message: 'Username can contain at most one dot \'.\' and one underscore \'_\'',
      };
    } else {
      return {
        pattern: '^[a-zA-Z0-9._]{5,13}$',
        message: 'Username can only contain letters, numbers, dot \'.\' and underscore \'_\'',
      };
    }
  }
};

export const validationPassword = (values) => {
  const passwordLength = values.length;
  const validation = {
    pattern: '^(?=.*[0-9]).{8,}$',
    message: '',
  };

  if (passwordLength < 8) {
    validation.message = 'Password must be at least 8 characters';
  } else {
    validation.message = 'Password must include at least one number';
  }
  return validation;
};

export const validationRoomName = (value) => {
  const roomNameLength = value.length;

  if (roomNameLength < 5) {
    return 'Room Name must be at least 5 characters';
  } else if (roomNameLength > 10) {
    return 'Room Name is a maximum of 10 characters';
  }
};

// game rules and set the result of game
export const gameRules = (player1Choice, player2Choice) => {
  if ((player1Choice === 'rock' && player2Choice === 'rock') || (player1Choice === 'paper' && player2Choice === 'paper') || (player1Choice === 'scissors' && player2Choice === 'scissors')) {
    return 'draw';
  } else if ((player1Choice === 'rock' && player2Choice === 'scissors') || (player1Choice === 'paper' && player2Choice === 'rock') || (player1Choice === 'scissors' && player2Choice === 'paper')) {
    return 'win';
  } else if ((player1Choice === 'rock' && player2Choice === 'paper') || (player1Choice === 'paper' && player2Choice === 'scissors') || (player1Choice === 'scissors' && player2Choice === 'rock')) {
    return 'lose';
  }
};
