---
pdf: carrousels/Transactions.pdf
post: "site/tips/Unity Catalog/Transactions.qmd"
document_title: "Make multi-table writes all-or-nothing"
---
A pipeline debits one table, credits another, appends to an audit log. Three statements, three separate commits.

The second one fails. The first is already durable. The third never runs. Your tables now disagree and you are repairing them by hand at 2am.

As of July 2026, transactions on Unity Catalog managed Delta tables are GA. Wrap the statements and the lakehouse guarantees all or nothing:

BEGIN ATOMIC
  UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
  INSERT INTO transfer_log VALUES (1, 2, 100, current_timestamp());
END;

A failure anywhere in the block rolls the whole block back. No partial writes reach the table.

Three things to know before you reach for it:

1. Every write target needs the catalogManaged table feature. Catalog commits move commit coordination from the file system to Unity Catalog, which is what lets one commit span two tables.

2. No DDL inside a transaction. Create your tables first.

3. Validate early with SIGNAL rather than letting a constraint trip on the last statement.

The full walkthrough builds a two-table funds transfer with an audit log, then deliberately breaks a CHECK constraint so you can verify the earlier writes were undone.

{{url}}

#databricks #unitycatalog #dataengineering #delta #sql
