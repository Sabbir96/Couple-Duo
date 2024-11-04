export function successToastStyle() {
  return {
    style: {
      border: '1px solid #fff',
      padding: '16px',
      color: '#fff',
      background:
        'linear-gradient(140deg, rgba(250, 44, 5, 1), rgba(246, 55, 227, 1), rgba(103, 58, 182, 1) )',
      borderRadius: '20px',
      fontFamily: 'Mabry Pro',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#673ab7',
      secondary: '#FFFAEE',
    },
  };
}

export function errorToastStyle() {
  return {
    style: {
      border: '1px solid #fa2c05',
      padding: '16px',
      color: '#fa2c05',
      borderRadius: '20px',
      fontFamily: 'Mabry Pro',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#fa2c05',
      secondary: '#FFFAEE',
    },
  };
}

export function infoToastStyle() {
  return {
    icon: 'ℹ️',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  };
}

export function warningToastStyle() {
  return {
    icon: '⚠️',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  };
}
