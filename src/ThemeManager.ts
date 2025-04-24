import { Theme, ThemeRecord } from './types';

class ThemeManager {
  private themes: ThemeRecord;
  private currentTheme: string;

  constructor() {
    this.themes = {
      default: {
        name: '主题色',
        background: '#f2f7ff',
        primaryColor: '#1677ff',
        textColor: '#1d3557',
        accentColor: '#1677ff',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(88, 153, 243, 0.15)'
      },
      dark: {
        name: '暗夜',
        background: '#2d3436',
        primaryColor: '#74b9ff',
        textColor: '#dfe6e9',
        accentColor: '#ff7675',
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      },
      instagram: {
        name: '迤逦风光',
        background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)',
        primaryColor: '#ffffff',
        textColor: '#ffffff',
        accentColor: '#ffffff',
        fontFamily: '"Segoe UI", sans-serif',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      Milky: {
        name: '银河',
        background: '#f5f8ff',
        primaryColor: '#4d6bfe',
        textColor: '#1a2234',
        accentColor: '#4d6bfe',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(77, 107, 254, 0.15)'
      },
      phoenix: {
        name: '赤炎',
        background: '#fff5f5',
        primaryColor: '#94070a',
        textColor: '#2b1314',
        accentColor: '#94070a',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(148, 7, 10, 0.15)'
      },
      crystal: {
        name: '紫水晶',
        background: '#f9f5ff',
        primaryColor: '#791cb5',
        textColor: '#2e1541',
        accentColor: '#791cb5',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(121, 28, 181, 0.15)'
      },
      Sunflower: {
        name: '向日葵',
        background: '#fffef5',
        primaryColor: '#e9b949',
        textColor: '#433422',
        accentColor: '#e9b949',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(233, 185, 73, 0.1)'
      },
      star: {
        name: '澄澈天空',
        background: '#f0f9ff',
        primaryColor: '#1e90ff',
        textColor: '#183553',
        accentColor: '#1e90ff',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(30, 144, 255, 0.15)'
      },
      sunset: {
        name: 'sunset',
        background: 'linear-gradient(135deg, #fff8f5, #ffeae0)',
        primaryColor: '#f45d22',
        textColor: '#ff7e4f',
        accentColor: '#f45d22',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(255,178,138,.2)'
      },
      sea: {
        name: '深海绿',
        background: '#f5fffd',
        primaryColor: '#38b2ac',
        textColor: '#234341',
        accentColor: '#38b2ac',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(56, 178, 172, 0.1)'
      },
      dreamy:{
          name: '紫晶',
          background: 'linear-gradient(135deg,#f5f7ff,#e8f0ff)',
          primaryColor: '#7b8cde',
          textColor: '#5e6fff',
          accentColor: '#7b8cde',
          fontFamily: '"Helvetica Neue", sans-serif',
          borderRadius: '16px',
          boxShadow: '0 15px 35px rgba(149,175,255,.2)'
      },
      leafage: {
        name: '新叶',
        background: '#f5fff8',
        primaryColor: '#48bb78',
        textColor: '#234337',
        accentColor: '#48bb78',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(72, 187, 120, 0.1)'
      },
      sky: {
        name: '晴空',
        background: '#f5faff',
        primaryColor: '#4299e1',
        textColor: '#2a3b53',
        accentColor: '#4299e1',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(66, 153, 225, 0.1)'
      },
      plum: {
        name: '红梅',
        background: '#ffffff',
        primaryColor: '#e60023',
        textColor: '#333333',
        accentColor: '#6e0f19',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '24px',
        boxShadow: '0 8px 16px rgba(230, 0, 35, 0.1)'
      }
    };
    
    this.currentTheme = 'default';
    this.applyTheme();
  }

  public getCurrentTheme(): string {
    return this.currentTheme;
  }

  public getTheme(themeName: string): Theme | null {
    return this.themes[themeName] || null;
  }

  public setTheme(themeName: string): boolean {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      this.applyTheme();
      return true;
    }
    return false;
  }

  public setRandomTheme(): string {
    const themeNames = Object.keys(this.themes);
    const randomIndex = Math.floor(Math.random() * themeNames.length);
    const newTheme = themeNames[randomIndex];
    this.setTheme(newTheme);
    return newTheme;
  }

  public applyTheme(): void {
    const theme = this.themes[this.currentTheme];
    
    // Set data-theme attribute on root for theme-specific selectors
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    
    // Find card preview container
    const cardContainer = document.getElementById('card-preview');
    if (cardContainer) {
      // Set CSS variables only on card container
      cardContainer.style.setProperty('--card-background', theme.background);
      cardContainer.style.setProperty('--card-primary-color', theme.primaryColor);
      cardContainer.style.setProperty('--card-text-color', theme.textColor);
      cardContainer.style.setProperty('--card-accent-color', theme.accentColor);
      cardContainer.style.setProperty('--card-font-family', theme.fontFamily);
      cardContainer.style.setProperty('--card-border-radius', theme.borderRadius);
      cardContainer.style.setProperty('--card-box-shadow', theme.boxShadow);
      // Update theme classes
      const themeClasses = Object.keys(this.themes).map(id => `theme-${id}`);
      cardContainer.classList.remove(...themeClasses);
      cardContainer.classList.add(`theme-${this.currentTheme}`);
    }
  }

  public getAllThemes(): Array<{id: string, name: string}> {
    return Object.entries(this.themes).map(([id, theme]) => ({
      id,
      name: theme.name
    }));
  }

  public addTheme(id: string, themeConfig: Partial<Theme>): boolean {
    if (this.themes[id]) {
      return false;
    }

    this.themes[id] = {
      name: themeConfig.name || id,
      background: themeConfig.background || '#ffffff',
      primaryColor: themeConfig.primaryColor || '#000000',
      textColor: themeConfig.textColor || '#333333',
      accentColor: themeConfig.accentColor || '#ff0000',
      fontFamily: themeConfig.fontFamily || 'Arial, sans-serif',
      borderRadius: themeConfig.borderRadius || '0px',
      boxShadow: themeConfig.boxShadow || 'none'
    };

    return true;
  }
}

export default ThemeManager;
