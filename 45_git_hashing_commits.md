# How Git Uses Hashing for Commits (Complete & Clear Guide)

> ⚠️ Reality check  
> If you say *“Git just stores code”*, you don’t understand Git.  
>  
> Git is a **hash-based content-addressed database**.  
> Commits are **identified, protected, and linked** using cryptographic hashing.

This file explains **exactly how**.

---

## WHAT IS A HASH? (VERY SIMPLE)

A hash is:
> A **fixed-length fingerprint** generated from data.

Properties:
- Same input → same hash
- Small change → completely different hash
- One-way (cannot reverse)

Git uses **SHA-1** (and moving to SHA-256).

---

## WHY GIT USES HASHING

Git uses hashing to:
- Identify commits uniquely
- Detect file changes
- Prevent data corruption
- Build commit history safely

Git does **NOT** track files by name.  
Git tracks **content by hash**.

---

## CORE IDEA (ONE LINE)

> **In Git, everything is addressed by its hash.**

---

## WHAT EXACTLY IS A COMMIT IN GIT?

A commit is **NOT just code**.

A commit object contains:
- Tree hash (snapshot of files)
- Parent commit hash(es)
- Author & committer info
- Timestamp
- Commit message

All of this is hashed together.

---

## COMMIT HASH (STEP-BY-STEP)

### STEP 1: Git Creates a Tree Object
- Represents folder structure
- Each file is stored as a **blob**
- Each blob has its own hash

```
file → blob hash
folder → tree hash
```

---

### STEP 2: Git Builds Commit Content

Git constructs text like:

```
tree <tree_hash>
parent <parent_commit_hash>
author Name <email>
committer Name <email>

Commit message
```

---

### STEP 3: Git Hashes the Commit

Git applies:
```
SHA1(commit_content)
```

Result:
```
e7b3c2a4f9c8d...
```

This becomes the **commit ID**.

---

## WHY COMMITS ARE IMMUTABLE

If you change:
- file content
- commit message
- author
- parent

The hash changes.

So:
> **Commits cannot be modified — only replaced.**

This guarantees history integrity.

---

## HOW HASHING BUILDS COMMIT HISTORY

Each commit stores **parent hash**:

```
C1 ← C2 ← C3 ← C4
```

If someone alters C2:
- C2 hash changes
- C3 parent breaks
- Entire chain breaks

Tampering is obvious.

---

## MERGE COMMITS & MULTIPLE PARENTS

Merge commit has **two parents**:

```
parent A
parent B
```

Hash includes both parents.

This preserves branching history accurately.

---

## WHY GIT IS FAST

Git does NOT diff files every time.

Instead:
- Checks hash
- If hash same → file unchanged
- If hash different → file changed

Hash comparison is O(1).

---

## HASHES USED BY GIT (OBJECT TYPES)

| Object | Purpose |
|-----|--------|
| blob | File content |
| tree | Directory structure |
| commit | Snapshot + metadata |
| tag | Named reference |

All identified by hashes.

---

## CONTENT-ADDRESSABLE STORAGE (IMPORTANT)

Git stores objects like:

```
.git/objects/e7/b3c2a4f9c8d...
```

Directory name = first 2 hash chars  
File name = rest of hash

---

## WHY HASH COLLISIONS ARE NOT A PRACTICAL ISSUE

- SHA-1 collision probability is extremely low
- Git also validates object structure
- Git is migrating to SHA-256

Practically safe.

---

## INTERVIEW-SAFE EXPLANATION

> “Git uses cryptographic hashing to uniquely identify commits. Each commit hash is generated from its content and parent hashes, making commits immutable and history tamper-evident.”

Say this confidently.

---

## COMMON BEGINNER MISCONCEPTIONS

❌ Commit hash is random  
❌ Commit hash depends on branch name  
❌ Git tracks file names only  
❌ Commits can be edited directly  

All false.

---

## FINAL VERDICT

Git hashing gives:
- Integrity
- Immutability
- Speed
- Reliable history

That’s why Git dominates version control.

---

END.
