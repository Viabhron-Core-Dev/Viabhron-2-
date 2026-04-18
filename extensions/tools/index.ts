import { Globe, FileText, Code } from 'lucide-react';
import { Extension } from '../../src/types';

export const headlessBrowserTool: Extension = {
  id: 'headless-browser',
  name: 'Headless Browser',
  description: 'Automated web browsing and data extraction.',
  icon: Globe,
  category: 'tool',
  status: 'active',
  source: 'inbuilt'
};

export const pdfExtractorTool: Extension = {
  id: 'pdf-extractor',
  name: 'PDF Extractor',
  description: 'Advanced text and data extraction from PDF documents.',
  icon: FileText,
  category: 'tool',
  status: 'active',
  source: 'inbuilt'
};

export const codeParserTool: Extension = {
  id: 'code-parser',
  name: 'Code Parser',
  description: 'Multi-language code analysis and parsing.',
  icon: Code,
  category: 'tool',
  status: 'active',
  source: 'inbuilt'
};
