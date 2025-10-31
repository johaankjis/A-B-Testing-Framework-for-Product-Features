# A/B Testing Framework for Product Features

A comprehensive web-based A/B testing framework built with Next.js, TypeScript, and Python for managing experiments, analyzing results, and making data-driven decisions about product features.

## 🎯 Features

### Experiment Management
- **Create and Configure Experiments**: Define experiments with custom variants, traffic allocation, and metrics
- **Status Tracking**: Monitor experiments through their lifecycle (draft, running, paused, completed)
- **Variant Management**: Configure multiple variants with custom traffic distribution
- **Timeline Visualization**: Track experiment progress over time

### Statistical Analysis
- **Statistical Significance Testing**: Automated z-tests and t-tests for conversion rates
- **Confidence Intervals**: Calculate and display confidence intervals for results
- **Sample Size Calculator**: Determine required sample size based on expected effect size
- **Uplift Calculations**: Measure relative and absolute improvements

### Analytics & Reporting
- **Real-time Dashboards**: Monitor experiment performance with interactive charts
- **Conversion Rate Analysis**: Track and compare conversion rates across variants
- **Metric Breakdown**: Analyze primary and secondary metrics
- **Win Rate Visualization**: Compare variant performance over time

### Data Management
- **SQL Database Schema**: Structured storage for experiments, variants, and events
- **User Assignment Tracking**: Persistent variant assignments for users
- **Event Logging**: Comprehensive event tracking for analysis

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **Python** 3.8+ (for statistical analysis scripts)
- **PostgreSQL** or compatible SQL database (for production use)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/A-B-Testing-Framework-for-Product-Features.git
   cd A-B-Testing-Framework-for-Product-Features
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database** (optional for development)
   ```bash
   # Run the SQL schema creation script
   psql -U your_user -d your_database -f sql/create_experiment_tables.sql
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── analytics/           # Analytics dashboard pages
│   ├── config/              # Configuration pages
│   ├── experiment/          # Experiment detail pages
│   ├── reports/             # Reporting pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Base UI components (shadcn/ui)
│   ├── analytics-overview.tsx
│   ├── experiment-list.tsx
│   ├── experiment-stats.tsx
│   ├── statistical-significance.tsx
│   └── ...
├── config/                  # Configuration files
│   └── experiment-template.yaml  # Experiment configuration template
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                     # Utility functions and types
│   ├── types.ts             # TypeScript type definitions
│   ├── statistical-utils.ts # Statistical calculation utilities
│   ├── mock-data.ts         # Sample data for development
│   └── utils.ts             # General utilities
├── scripts/                 # Python analysis scripts
│   └── statistical_analysis.py  # Statistical testing functions
├── sql/                     # Database schemas and queries
│   ├── create_experiment_tables.sql
│   └── query_experiment_metrics.sql
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 🧪 Running an Experiment

### 1. Define Your Experiment

Create a new experiment configuration using the template in `config/experiment-template.yaml`:

```yaml
experiment:
  name: "New Feature Test"
  description: "Testing new checkout flow"
  status: "draft"
  
  schedule:
    start_date: "2025-02-01"
    duration_days: 14
  
  hypothesis: "New checkout flow will improve conversion by 10%"
  primary_metric: "conversion_rate"
  
  variants:
    - id: "control"
      name: "Control"
      traffic_percentage: 50
      is_control: true
      
    - id: "treatment"
      name: "New Flow"
      traffic_percentage: 50
      is_control: false
```

### 2. Set Up Traffic Allocation

- Configure what percentage of users should see each variant
- Set minimum and maximum sample sizes
- Define traffic allocation percentage

### 3. Track Metrics

The framework tracks:
- **Primary Metrics**: Main success criteria (e.g., conversion rate)
- **Secondary Metrics**: Additional indicators (e.g., revenue per user, engagement)
- **Guardrail Metrics**: Safety checks (e.g., error rates, page load times)

### 4. Analyze Results

Use the statistical analysis tools to:
- Calculate statistical significance
- Determine confidence intervals
- Measure uplift (relative and absolute)
- Visualize performance over time

## 📊 Statistical Analysis

### Python Statistical Module

The `scripts/statistical_analysis.py` module provides:

```python
from statistical_analysis import calculate_z_test, calculate_sample_size

# Perform statistical test
results = calculate_z_test(
    control_conversions=1895,
    control_total=22500,
    treatment_conversions=2234,
    treatment_total=22500
)

print(f"P-value: {results['p_value']:.6f}")
print(f"Relative Uplift: {results['relative_uplift']:.2%}")
print(f"Significant: {results['is_significant']}")

# Calculate required sample size
sample_size = calculate_sample_size(
    baseline_rate=0.08,
    mde=0.05,  # 5% minimum detectable effect
    alpha=0.05,
    power=0.80
)
```

### Key Statistical Concepts

- **Confidence Level**: Default 95% (p-value < 0.05 for significance)
- **Statistical Power**: Default 80% (ability to detect true effects)
- **Minimum Detectable Effect (MDE)**: Smallest change worth detecting
- **Two-tailed vs One-tailed Tests**: Configurable based on hypothesis

## 🗄️ Database Schema

The framework uses a relational database with the following tables:

- **experiments**: Core experiment metadata
- **variants**: Variant definitions and traffic allocation
- **user_assignments**: User-to-variant mappings
- **experiment_events**: Event tracking (conversions, clicks, etc.)
- **experiment_results**: Calculated statistical results

See `sql/create_experiment_tables.sql` for the complete schema.

## 🎨 Technology Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization

### Backend/Analysis
- **Python 3**: Statistical analysis
- **NumPy**: Numerical computations
- **SciPy**: Statistical functions
- **SQL**: Data storage and querying

## 📈 Key Components

### ExperimentList
Displays all experiments with filtering and sorting capabilities.

### ExperimentStats
Shows high-level statistics and KPIs for experiments.

### StatisticalSignificance
Calculates and displays statistical significance indicators.

### SampleSizeCalculator
Helps determine required sample sizes before running experiments.

### VariantComparison
Side-by-side comparison of variant performance.

### WinRateChart
Visualizes which variant is winning over time.

## 🔒 Best Practices

1. **Define Clear Hypotheses**: Always state what you expect to happen and why
2. **Set Sample Size Targets**: Use the sample size calculator before starting
3. **Monitor Guardrail Metrics**: Ensure experiments don't harm other aspects
4. **Run for Sufficient Duration**: Account for weekly patterns and seasonality
5. **Wait for Statistical Significance**: Don't stop experiments too early
6. **Document Everything**: Use the metadata fields to track context

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

For questions or issues, please:
- Open an issue on GitHub
- Review the experiment configuration template
- Check the statistical analysis documentation

## 🚧 Roadmap

- [ ] Multi-armed bandit algorithms
- [ ] Bayesian A/B testing
- [ ] Sequential testing capabilities
- [ ] API endpoints for programmatic access
- [ ] Integration with analytics platforms
- [ ] Advanced segmentation analysis
- [ ] Real-time alerting system

---

Built with ❤️ for data-driven product development
