
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { X, Settings, Plus, Minus } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useLocalStorage } from 'react-use';

// Define the UI theme structure
interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: string;
    lineHeight: string;
  };
  spacing: {
    containerPadding: string;
    itemGap: string;
    borderRadius: string;
  };
  blogSettings: {
    postsPerPage: string;
    showAuthor: string;
    showDate: string;
    showReadTime: string;
  };
}

// Default theme settings
const defaultTheme: ThemeSettings = {
  colors: {
    primary: '#047857',
    secondary: '#0f172a',
    accent: '#0ea5e9',
    background: '#f8fafc',
    text: '#334155',
  },
  typography: {
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  spacing: {
    containerPadding: '1.5rem',
    itemGap: '1rem',
    borderRadius: '0.5rem',
  },
  blogSettings: {
    postsPerPage: '10',
    showAuthor: 'true',
    showDate: 'true',
    showReadTime: 'true',
  },
};

const UiEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage<ThemeSettings>('blog-ui-theme', defaultTheme);

  // Apply theme to document root (CSS variables)
  const applyTheme = () => {
    if (!theme) return;

    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--blog-primary', theme.colors.primary);
    root.style.setProperty('--blog-secondary', theme.colors.secondary);
    root.style.setProperty('--blog-accent', theme.colors.accent);
    root.style.setProperty('--blog-background', theme.colors.background);
    root.style.setProperty('--blog-text', theme.colors.text);
    
    // Apply typography
    root.style.setProperty('--blog-heading-font', theme.typography.headingFont);
    root.style.setProperty('--blog-body-font', theme.typography.bodyFont);
    root.style.setProperty('--blog-font-size', theme.typography.fontSize);
    root.style.setProperty('--blog-line-height', theme.typography.lineHeight);
    
    // Apply spacing
    root.style.setProperty('--blog-container-padding', theme.spacing.containerPadding);
    root.style.setProperty('--blog-item-gap', theme.spacing.itemGap);
    root.style.setProperty('--blog-border-radius', theme.spacing.borderRadius);
  };

  // Apply theme when component mounts and when theme changes
  useState(() => {
    applyTheme();
  });

  const handleInputChange = (
    category: keyof ThemeSettings,
    property: string,
    value: string
  ) => {
    if (!theme) return;
    
    setTheme({
      ...theme,
      [category]: {
        ...theme[category],
        [property]: value,
      },
    });
    
    applyTheme();
  };

  const resetToDefaults = () => {
    setTheme(defaultTheme);
    applyTheme();
  };

  // Number input handlers
  const incrementValue = (
    category: keyof ThemeSettings,
    property: string,
    step: number
  ) => {
    if (!theme) return;
    
    const currentValue = theme[category][property as keyof typeof theme[typeof category]];
    let numericValue = parseInt(currentValue as string);
    
    if (!isNaN(numericValue)) {
      handleInputChange(category, property, (numericValue + step).toString());
    }
  };
  
  const decrementValue = (
    category: keyof ThemeSettings,
    property: string,
    step: number
  ) => {
    if (!theme) return;
    
    const currentValue = theme[category][property as keyof typeof theme[typeof category]];
    let numericValue = parseInt(currentValue as string);
    
    if (!isNaN(numericValue) && numericValue > step) {
      handleInputChange(category, property, (numericValue - step).toString());
    }
  };

  // Boolean input handler
  const toggleBooleanValue = (
    category: keyof ThemeSettings,
    property: string
  ) => {
    if (!theme) return;
    
    const currentValue = theme[category][property as keyof typeof theme[typeof category]];
    const newValue = currentValue === 'true' ? 'false' : 'true';
    
    handleInputChange(category, property, newValue);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full fixed bottom-10 right-10 z-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          >
            <Settings size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl">UI Settings</SheetTitle>
            <SheetDescription>
              Customize the appearance of your blog
            </SheetDescription>
          </SheetHeader>
          
          <Tabs defaultValue="colors">
            <TabsList className="mb-4 w-full grid grid-cols-4">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Input
                  id="primary-color"
                  type="color"
                  value={theme?.colors.primary || defaultTheme.colors.primary}
                  onChange={(e) => handleInputChange('colors', 'primary', e.target.value)}
                  className="h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <Input
                  id="secondary-color"
                  type="color"
                  value={theme?.colors.secondary || defaultTheme.colors.secondary}
                  onChange={(e) => handleInputChange('colors', 'secondary', e.target.value)}
                  className="h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <Input
                  id="accent-color"
                  type="color"
                  value={theme?.colors.accent || defaultTheme.colors.accent}
                  onChange={(e) => handleInputChange('colors', 'accent', e.target.value)}
                  className="h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <Input
                  id="background-color"
                  type="color"
                  value={theme?.colors.background || defaultTheme.colors.background}
                  onChange={(e) => handleInputChange('colors', 'background', e.target.value)}
                  className="h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text-color">Text Color</Label>
                <Input
                  id="text-color"
                  type="color"
                  value={theme?.colors.text || defaultTheme.colors.text}
                  onChange={(e) => handleInputChange('colors', 'text', e.target.value)}
                  className="h-10"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="typography" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heading-font">Heading Font</Label>
                <Input
                  id="heading-font"
                  value={theme?.typography.headingFont || defaultTheme.typography.headingFont}
                  onChange={(e) => handleInputChange('typography', 'headingFont', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body-font">Body Font</Label>
                <Input
                  id="body-font"
                  value={theme?.typography.bodyFont || defaultTheme.typography.bodyFont}
                  onChange={(e) => handleInputChange('typography', 'bodyFont', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Base Font Size</Label>
                <Input
                  id="font-size"
                  value={theme?.typography.fontSize || defaultTheme.typography.fontSize}
                  onChange={(e) => handleInputChange('typography', 'fontSize', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="line-height">Line Height</Label>
                <Input
                  id="line-height"
                  value={theme?.typography.lineHeight || defaultTheme.typography.lineHeight}
                  onChange={(e) => handleInputChange('typography', 'lineHeight', e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="spacing" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="container-padding">Container Padding</Label>
                <Input
                  id="container-padding"
                  value={theme?.spacing.containerPadding || defaultTheme.spacing.containerPadding}
                  onChange={(e) => handleInputChange('spacing', 'containerPadding', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-gap">Item Gap</Label>
                <Input
                  id="item-gap"
                  value={theme?.spacing.itemGap || defaultTheme.spacing.itemGap}
                  onChange={(e) => handleInputChange('spacing', 'itemGap', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="border-radius">Border Radius</Label>
                <Input
                  id="border-radius"
                  value={theme?.spacing.borderRadius || defaultTheme.spacing.borderRadius}
                  onChange={(e) => handleInputChange('spacing', 'borderRadius', e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="posts-per-page">Posts Per Page</Label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    type="button"
                    onClick={() => decrementValue('blogSettings', 'postsPerPage', 1)}
                  >
                    <Minus size={16} />
                  </Button>
                  <Input
                    id="posts-per-page"
                    value={theme?.blogSettings.postsPerPage || defaultTheme.blogSettings.postsPerPage}
                    onChange={(e) => handleInputChange('blogSettings', 'postsPerPage', e.target.value)}
                    className="mx-2 text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    type="button"
                    onClick={() => incrementValue('blogSettings', 'postsPerPage', 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-author">Show Author</Label>
                <Button
                  variant={theme?.blogSettings.showAuthor === 'true' ? 'default' : 'outline'}
                  onClick={() => toggleBooleanValue('blogSettings', 'showAuthor')}
                >
                  {theme?.blogSettings.showAuthor === 'true' ? 'Yes' : 'No'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-date">Show Date</Label>
                <Button
                  variant={theme?.blogSettings.showDate === 'true' ? 'default' : 'outline'}
                  onClick={() => toggleBooleanValue('blogSettings', 'showDate')}
                >
                  {theme?.blogSettings.showDate === 'true' ? 'Yes' : 'No'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-read-time">Show Read Time</Label>
                <Button
                  variant={theme?.blogSettings.showReadTime === 'true' ? 'default' : 'outline'}
                  onClick={() => toggleBooleanValue('blogSettings', 'showReadTime')}
                >
                  {theme?.blogSettings.showReadTime === 'true' ? 'Yes' : 'No'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-6" />
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UiEditor;
