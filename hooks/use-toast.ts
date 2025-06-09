// In hooks/use-toast.ts
type ToastOptions = {
  title?: string;
  description: string;
  duration?: number;
};

export function useToast() {
  return {
    toast: (message: string | ToastOptions) => {
      if (typeof message === 'string') {
        // Handle string case
        console.log('Toast:', message);
      } else {
        // Handle object case
        console.log('Toast:', `${message.title}: ${message.description}`);
      }
      // Actual toast implementation
    }
  };
}