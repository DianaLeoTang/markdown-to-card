import React, { useState, useEffect, useRef } from 'react';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import ThemeSelector from './components/ThemeSelector';
import ThemeManager from './ThemeManager';
import MarkdownRenderer from './MarkdownRenderer';
import ExportService from './ExportService';

const defaultMarkdown = `# MD2Card

MD2Card 是一个 markdown 转知识卡片工具，可以让你用 Markdown 制作精美的图文海报。✨

## 主要功能:

1. 将 Markdown 转化为图文海报
2. 多种主题风格任你选择
3. 简单易用，一键导出

[立即尝试](#tag:工具) [分享](#tag:分享)

:::tip 温馨提示：可以使用随机主题来获取灵感 :::`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [renderedHtml, setRenderedHtml] = useState('');
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isExporting, setIsExporting] = useState(false);

  // Initialize services using useRef to maintain instances across renders
  const themeManagerRef = useRef(new ThemeManager());
  const markdownRendererRef = useRef(new MarkdownRenderer());

  // Apply theme on initialization and theme changes
  useEffect(() => {
    themeManagerRef.current.setTheme(currentTheme);
  }, [currentTheme]);

  // Update rendered HTML when markdown changes
  useEffect(() => {
    try {
      const html = markdownRendererRef.current.render(markdown);
      setRenderedHtml(html);
    } catch (error) {
      console.error('Rendering error:', error);
    }
  }, [markdown]);

  // Handle theme changes
  const handleThemeChange = (themeId: string) => {
    if (themeManagerRef.current.setTheme(themeId)) {
      setCurrentTheme(themeId);
    }
  };

  // Handle random theme
  const handleRandomTheme = () => {
    const newTheme = themeManagerRef.current.setRandomTheme();
    setCurrentTheme(newTheme);
  };

  // Handle export to PNG
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const title = markdown.split('\n')[0].replace(/^#\s+/, '');
      const filename = ExportService.generateFilename(title);
      await ExportService.exportToPNG('card-preview', filename);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="text-2xl font-bold text-primary">MD2Card</h1>
        <ThemeSelector
          themes={themeManagerRef.current.getAllThemes()}
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onRandomTheme={handleRandomTheme}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </header>

      <main className="app-main">
        <EditorPanel
          value={markdown}
          onChange={(value) => setMarkdown(value)}
        />
        <PreviewPanel html={renderedHtml} />
      </main>
    </div>
  );
};

export default App;
