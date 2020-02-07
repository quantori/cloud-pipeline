ALTER TABLE PIPELINE.RUN_SCHEDULE ADD TYPE TEXT NOT NULL DEFAULT 'PIPELINE_RUN';
ALTER TABLE PIPELINE.RUN_SCHEDULE ADD USER_NAME TEXT NOT NULL DEFAULT '${default.admin}';
ALTER TABLE PIPELINE.RUN_SCHEDULE RENAME COLUMN run_id TO schedulable_id;
ALTER TABLE PIPELINE.RUN_SCHEDULE DROP CONSTRAINT IF EXISTS run_schedule_run_id_fkey;

