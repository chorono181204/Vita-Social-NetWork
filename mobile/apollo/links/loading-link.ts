import { ApolloLink, Observable } from '@apollo/client';
import * as toast from '../utils/toast';

export const loadingLink = new ApolloLink((operation, forward) => {
  let show = false;
  const timer = setTimeout(() => {
    show = true;
    toast.showInfo('Loading...', 'Please wait...');
  }, 200); // Chỉ show loading nếu > 200ms

  // Timer cho lỗi mạng (timeout)
  const timeout = setTimeout(() => {
    toast.showError('Network Error', 'Request timed out, please check your connection.');
  }, 10000); // 10 giây

  return new Observable(observer => {
    const sub = forward(operation).subscribe({
      next: result => {
        clearTimeout(timer);
        clearTimeout(timeout);
        if (show) toast.hide();
        observer.next(result);
      },
      error: err => {
        clearTimeout(timer);
        clearTimeout(timeout);
        if (show) toast.hide();
        observer.error(err);
      },
      complete: () => {
        clearTimeout(timer);
        clearTimeout(timeout);
        if (show) toast.hide();
        observer.complete();
      },
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(timeout);
      if (show) toast.hide();
      sub.unsubscribe();
    };
  });
});