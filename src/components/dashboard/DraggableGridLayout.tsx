import { useState, useCallback, useEffect, useRef } from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import { GripVertical, Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}

interface DraggableGridLayoutProps {
  children: React.ReactElement[];
  layouts: Layouts;
  onLayoutChange?: (currentLayout: Layout[], allLayouts: Layouts) => void;
  rowHeight?: number;
  className?: string;
  isEditable?: boolean;
  onEditToggle?: (isEditing: boolean) => void;
}

export function DraggableGridLayout({
  children,
  layouts,
  onLayoutChange,
  rowHeight = 80,
  className = '',
  isEditable = true,
  onEditToggle,
}: DraggableGridLayoutProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLayouts, setCurrentLayouts] = useState<Layouts>(layouts);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLayoutChange = useCallback((currentLayout: Layout[], allLayouts: Layouts) => {
    setCurrentLayouts(allLayouts);
    onLayoutChange?.(currentLayout, allLayouts);
  }, [onLayoutChange]);

  const toggleEditMode = () => {
    const newMode = !isEditMode;
    setIsEditMode(newMode);
    onEditToggle?.(newMode);
  };

  // Map children with grid item wrapper
  const gridItems = children.map((child) => {
    const key = child.key as string;
    
    return (
      <div
        key={key}
        className={cn(
          "grid-item group relative rounded-xl overflow-hidden",
          isEditMode && "ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
        )}
      >
        {/* Drag Handle - visible in edit mode */}
        {isEditMode && (
          <div className="drag-handle absolute top-2 left-2 z-30 cursor-move bg-primary/90 backdrop-blur-sm rounded-md p-1.5 border border-primary/50 shadow-lg hover:bg-primary transition-colors">
            <GripVertical className="w-4 h-4 text-primary-foreground" />
          </div>
        )}

        {/* Content */}
        <div className="h-full w-full">
          {child}
        </div>

        {/* Resize indicator in edit mode */}
        {isEditMode && (
          <div className="absolute bottom-2 right-2 z-30 opacity-70">
            <div className="w-5 h-5 flex items-center justify-center bg-primary/80 rounded-sm">
              <svg width="10" height="10" viewBox="0 0 10 10" className="text-primary-foreground">
                <path d="M0 10L10 0M5 10L10 5M10 10L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Edit mode toggle button */}
      {isEditable && (
        <div className="absolute -top-12 right-0 z-50">
          <Button
            variant={isEditMode ? "default" : "outline"}
            size="sm"
            onClick={toggleEditMode}
            className={cn(
              "gap-2 transition-all",
              isEditMode ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
            )}
          >
            {isEditMode ? (
              <>
                <Lock className="w-4 h-4" />
                Verrouiller
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Personnaliser
              </>
            )}
          </Button>
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={currentLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        draggableHandle=".drag-handle"
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
      >
        {gridItems}
      </ResponsiveGridLayout>

      <style>{`
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top, width, height;
        }
        
        .react-grid-item.cssTransforms {
          transition-property: transform, width, height;
        }
        
        .react-grid-item.resizing {
          z-index: 50;
          will-change: width, height;
        }
        
        .react-grid-item.react-draggable-dragging {
          z-index: 50;
          will-change: transform;
          opacity: 0.95;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
        
        .react-grid-item > .react-resizable-handle {
          position: absolute;
          width: 24px;
          height: 24px;
          bottom: 4px;
          right: 4px;
          cursor: se-resize;
        }
        
        .react-grid-item > .react-resizable-handle::after {
          content: "";
          position: absolute;
          right: 6px;
          bottom: 6px;
          width: 10px;
          height: 10px;
          border-right: 3px solid hsl(var(--primary) / 0.6);
          border-bottom: 3px solid hsl(var(--primary) / 0.6);
        }
        
        .react-grid-placeholder {
          background: hsl(var(--primary) / 0.15) !important;
          border: 2px dashed hsl(var(--primary) / 0.4) !important;
          border-radius: 12px;
          transition-duration: 100ms;
          z-index: 2;
        }
        
        .grid-item {
          height: 100%;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}

// Default layouts for the mining dashboard
export const defaultDashboardLayouts: Layouts = {
  lg: [
    { i: 'targeted-sites', x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
    { i: 'all-sites-map', x: 3, y: 0, w: 6, h: 6, minW: 4, minH: 4 },
    { i: 'target-sites', x: 9, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
    { i: 'sites-list', x: 0, y: 6, w: 12, h: 2, minW: 6, minH: 2, maxH: 3 },
  ],
  md: [
    { i: 'targeted-sites', x: 0, y: 0, w: 4, h: 5, minW: 3, minH: 4 },
    { i: 'all-sites-map', x: 4, y: 0, w: 8, h: 5, minW: 4, minH: 4 },
    { i: 'target-sites', x: 0, y: 5, w: 12, h: 5, minW: 4, minH: 4 },
    { i: 'sites-list', x: 0, y: 10, w: 12, h: 2, minW: 6, minH: 2 },
  ],
  sm: [
    { i: 'targeted-sites', x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'all-sites-map', x: 0, y: 5, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'target-sites', x: 0, y: 10, w: 6, h: 5, minW: 4, minH: 4 },
    { i: 'sites-list', x: 0, y: 15, w: 6, h: 3, minW: 4, minH: 2 },
  ],
  xs: [
    { i: 'targeted-sites', x: 0, y: 0, w: 4, h: 5, minW: 4, minH: 4 },
    { i: 'all-sites-map', x: 0, y: 5, w: 4, h: 5, minW: 4, minH: 4 },
    { i: 'target-sites', x: 0, y: 10, w: 4, h: 5, minW: 4, minH: 4 },
    { i: 'sites-list', x: 0, y: 15, w: 4, h: 3, minW: 4, minH: 2 },
  ],
  xxs: [
    { i: 'targeted-sites', x: 0, y: 0, w: 2, h: 5, minW: 2, minH: 4 },
    { i: 'all-sites-map', x: 0, y: 5, w: 2, h: 5, minW: 2, minH: 4 },
    { i: 'target-sites', x: 0, y: 10, w: 2, h: 5, minW: 2, minH: 4 },
    { i: 'sites-list', x: 0, y: 15, w: 2, h: 3, minW: 2, minH: 2 },
  ],
};

// Hook for managing grid layouts with persistence
export function useGridLayout(initialLayouts: Layouts, storageKey = 'dashboard-layout') {
  const [layouts, setLayouts] = useState<Layouts>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialLayouts;
      }
    }
    return initialLayouts;
  });

  const saveLayout = useCallback((newLayouts: Layouts) => {
    setLayouts(newLayouts);
    localStorage.setItem(storageKey, JSON.stringify(newLayouts));
  }, [storageKey]);

  const resetLayout = useCallback(() => {
    setLayouts(initialLayouts);
    localStorage.removeItem(storageKey);
  }, [initialLayouts, storageKey]);

  return {
    layouts,
    saveLayout,
    resetLayout,
  };
}
