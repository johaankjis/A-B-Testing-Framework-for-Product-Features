-- A/B Testing Framework - Database Schema
-- Creates tables for experiment tracking and results

-- Experiments table
CREATE TABLE IF NOT EXISTS experiments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    hypothesis TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    traffic_allocation INTEGER DEFAULT 100,
    sample_size INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Variants table
CREATE TABLE IF NOT EXISTS variants (
    id VARCHAR(50) PRIMARY KEY,
    experiment_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    traffic_percentage INTEGER NOT NULL,
    is_control BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (experiment_id) REFERENCES experiments(id)
);

-- User assignments table
CREATE TABLE IF NOT EXISTS user_assignments (
    user_id VARCHAR(50) NOT NULL,
    experiment_id VARCHAR(50) NOT NULL,
    variant_id VARCHAR(50) NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, experiment_id),
    FOREIGN KEY (experiment_id) REFERENCES experiments(id),
    FOREIGN KEY (variant_id) REFERENCES variants(id)
);

-- Events table
CREATE TABLE IF NOT EXISTS experiment_events (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    experiment_id VARCHAR(50) NOT NULL,
    variant_id VARCHAR(50) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_value DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (experiment_id) REFERENCES experiments(id),
    FOREIGN KEY (variant_id) REFERENCES variants(id)
);

-- Results table
CREATE TABLE IF NOT EXISTS experiment_results (
    id SERIAL PRIMARY KEY,
    experiment_id VARCHAR(50) NOT NULL,
    variant_id VARCHAR(50) NOT NULL,
    sample_size INTEGER NOT NULL,
    conversion_rate DECIMAL(10, 6),
    mean_value DECIMAL(10, 6),
    std_deviation DECIMAL(10, 6),
    confidence_interval_lower DECIMAL(10, 6),
    confidence_interval_upper DECIMAL(10, 6),
    p_value DECIMAL(10, 6),
    statistical_significance BOOLEAN,
    relative_uplift DECIMAL(10, 6),
    absolute_uplift DECIMAL(10, 6),
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (experiment_id) REFERENCES experiments(id),
    FOREIGN KEY (variant_id) REFERENCES variants(id)
);

-- Indexes for performance
CREATE INDEX idx_experiments_status ON experiments(status);
CREATE INDEX idx_user_assignments_user ON user_assignments(user_id);
CREATE INDEX idx_user_assignments_experiment ON user_assignments(experiment_id);
CREATE INDEX idx_events_experiment ON experiment_events(experiment_id);
CREATE INDEX idx_events_timestamp ON experiment_events(timestamp);
