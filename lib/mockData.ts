import { Dataset } from '@/types/dataset';

export const mockDatasets: Dataset[] = [
  {
    id: '1',
    title: 'GWAS Study: Type 2 Diabetes Susceptibility in East Asian Populations',
    description: 'Comprehensive genome-wide association study identifying novel genetic variants associated with T2D risk in 50,000 East Asian individuals.',
    fileSize: 245000000, // 245 MB
    uploadDate: '2024-01-15',
    tags: ['GWAS', 'diabetes', 'SNP', 'population-genetics', 'East-Asian'],
    price: 12.5,
    accessLevel: 'Premium',
    uploader: 'Research Consortium Asia',
    dataType: 'CSV'
  },
  {
    id: '2',
    title: 'Whole Exome Sequencing: Rare Disease Cohort Analysis',
    description: 'WES data from 1,200 patients with undiagnosed rare diseases, including phenotype annotations and variant classifications.',
    fileSize: 1200000000, // 1.2 GB
    uploadDate: '2024-01-12',
    tags: ['WES', 'rare-disease', 'variant-analysis', 'clinical', 'phenotype'],
    price: 25.0,
    accessLevel: 'Premium',
    uploader: 'Rare Disease Foundation',
    dataType: 'JSON'
  },
  {
    id: '3',
    title: 'Pharmacogenomics: Drug Response Variants in Cancer Treatment',
    description: 'Genetic markers associated with chemotherapy response in breast cancer patients, including dosage optimization data.',
    fileSize: 89000000, // 89 MB
    uploadDate: '2024-01-10',
    tags: ['pharmacogenomics', 'cancer', 'drug-response', 'oncology', 'biomarkers'],
    price: 18.75,
    accessLevel: 'Standard',
    uploader: 'Cancer Research Institute',
    dataType: 'CSV'
  },
  {
    id: '4',
    title: 'Epigenomic Atlas: DNA Methylation Patterns in Aging',
    description: 'Longitudinal study of DNA methylation changes across human lifespan in multiple tissue types from 800 participants.',
    fileSize: 456000000, // 456 MB
    uploadDate: '2024-01-08',
    tags: ['epigenomics', 'methylation', 'aging', 'longitudinal', 'multi-tissue'],
    price: 22.0,
    accessLevel: 'Premium',
    uploader: 'Aging Research Network',
    dataType: 'JSON'
  },
  {
    id: '5',
    title: 'Microbiome-Genome Interactions in IBD Patients',
    description: 'Integrated analysis of host genetics and gut microbiome composition in inflammatory bowel disease cohort of 2,500 patients.',
    fileSize: 340000000, // 340 MB
    uploadDate: '2024-01-05',
    tags: ['microbiome', 'IBD', 'host-genetics', 'gut-health', 'inflammation'],
    price: 16.25,
    accessLevel: 'Standard',
    uploader: 'Microbiome Consortium',
    dataType: 'JSON'
  },
  {
    id: '6',
    title: 'Polygenic Risk Scores: Cardiovascular Disease Prediction',
    description: 'Validated PRS models for CVD risk prediction across diverse populations, including model weights and validation metrics.',
    fileSize: 67000000, // 67 MB
    uploadDate: '2024-01-03',
    tags: ['PRS', 'cardiovascular', 'risk-prediction', 'multi-ethnic', 'validation'],
    price: 14.5,
    accessLevel: 'Open',
    uploader: 'Cardiac Genomics Alliance',
    dataType: 'CSV'
  },
  {
    id: '7',
    title: 'Single-Cell RNA-seq: Neural Development Atlas',
    description: 'High-resolution single-cell transcriptomics of human brain development from 15 to 25 weeks gestation.',
    fileSize: 890000000, // 890 MB
    uploadDate: '2024-01-01',
    tags: ['scRNA-seq', 'neurodevelopment', 'brain', 'transcriptomics', 'embryonic'],
    price: 35.0,
    accessLevel: 'Premium',
    uploader: 'Neurodevelopment Consortium',
    dataType: 'JSON'
  },
  {
    id: '8',
    title: 'Ancient DNA: Population Migration Patterns',
    description: 'Genomic analysis of 500 ancient samples spanning 10,000 years, revealing human migration and admixture patterns.',
    fileSize: 178000000, // 178 MB
    uploadDate: '2023-12-28',
    tags: ['ancient-DNA', 'population-genetics', 'migration', 'admixture', 'archaeology'],
    price: 20.0,
    accessLevel: 'Standard',
    uploader: 'Archaeological Genomics Lab',
    dataType: 'CSV'
  }
];