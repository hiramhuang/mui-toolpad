import * as React from 'react';
import { fireEvent } from '@mui/toolpad-core/runtime';
import ToolpadApp, { EditorHooks, EditorHooksContext } from '../ToolpadApp';
import * as appDom from '../../appDom';

export interface AppCanvasState {
  appId: string;
  dom: appDom.AppDom;
}

export interface ToolpadBridge {
  update(updates: AppCanvasState): void;
}

declare global {
  interface Window {
    __TOOLPAD_READY__?: boolean | (() => void);
    __TOOLPAD_BRIDGE__?: ToolpadBridge;
  }
}

export interface AppCanvasProps {
  basename: string;
}

export default function AppCanvas({ basename }: AppCanvasProps) {
  const [state, setState] = React.useState<AppCanvasState | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    window.__TOOLPAD_BRIDGE__ = {
      update: (newState) => {
        React.startTransition(() => {
          setState(newState);
        });
      },
    };
    // eslint-disable-next-line no-underscore-dangle
    if (typeof window.__TOOLPAD_READY__ === 'function') {
      // eslint-disable-next-line no-underscore-dangle
      window.__TOOLPAD_READY__();
    } else {
      // eslint-disable-next-line no-underscore-dangle
      window.__TOOLPAD_READY__ = true;
    }
    return () => {
      // eslint-disable-next-line no-underscore-dangle
      delete window.__TOOLPAD_BRIDGE__;
    };
  }, []);

  React.useEffect(() => {
    // Run after every render
    fireEvent({ type: 'afterRender' });
  });

  const editorHooks: EditorHooks = React.useMemo(() => {
    return {
      navigateToPage(pageNodeId) {
        fireEvent({ type: 'pageNavigationRequest', pageNodeId });
      },
    };
  }, []);

  return state ? (
    <EditorHooksContext.Provider value={editorHooks}>
      <ToolpadApp
        dom={state.dom}
        version="preview"
        appId={state.appId}
        basename={`${basename}/${state.appId}`}
      />
    </EditorHooksContext.Provider>
  ) : (
    <div>loading...</div>
  );
}
