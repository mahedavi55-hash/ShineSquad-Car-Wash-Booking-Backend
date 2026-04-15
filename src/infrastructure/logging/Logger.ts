class Logger {
  info(message: string, metadata?: unknown): void {
    console.log(`[INFO] ${message}`, metadata || '');
  }

  warn(message: string, metadata?: unknown): void {
    console.warn(`[WARN] ${message}`, metadata || '');
  }

  error(message: string, metadata?: unknown): void {
    console.error(`[ERROR] ${message}`, metadata || '');
  }
}

export const appLogger = new Logger();
