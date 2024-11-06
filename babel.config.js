module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',  
        {
          root: ['./'],  
          alias: {
            '@components': './components',  
            '@constants': './constants',   
            '@screens': './screens',       
            '@lib': './lib',               
            '@context': './context',        
            '@assets': './assets',          
            '@data': './data', 
            '@utils': './utils', 
            '@screens': './screens',
          },
        },
      ],
    ],
  };
};
