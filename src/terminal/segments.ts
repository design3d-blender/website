export type AccentVariant = 'accent' | 'accent-2' | 'accent-3' | 'success' | 'warning' | 'danger';

export type Segment =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'accent'; value: string; variant: AccentVariant }
  | { type: 'link'; href: string; label: string }
  | { type: 'prompt'; directory?: string };

export function text(value: string): Segment {
  return { type: 'text', value };
}

export function bold(value: string): Segment {
  return { type: 'bold', value };
}

export function accent(value: string, variant: AccentVariant = 'accent'): Segment {
  return { type: 'accent', value, variant };
}

export function link(href: string, label: string): Segment {
  return { type: 'link', href, label };
}

export function prompt(directory?: string): Segment {
  return { type: 'prompt', directory };
}
