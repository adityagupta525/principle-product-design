~~~mermaid
---
title: User Journey Diagram
---
flowchart LR
    A[Trigger or investment need] --> B[Registration and secure access]
    B --> C[Country and tax residency context]
    C --> D[KYC, AML, FATCA and CRS]
    D --> E[Bank and NRE/NRO verification]
    E --> F[Fund discovery and decision]
    F --> G[Investment or redemption action]
    G --> H[Payment and execution]
    H --> I[Settlement and portfolio update]
    I --> J[Tax, reports and repatriation]
    J --> K[Documents, family and continuity]
    K --> L[Support, RM or specialist recovery]
    L --> M[Repeat investment or lifecycle event]

    C -. restricted .-> X[Explain restriction and safe exit]
    D -. failed .-> Y[KYC correction or human review]
    H -. pending or failed .-> Z[Reconciliation and service recovery]
~~~

~~~mermaid
---
title: End-to-End User Flow
---
flowchart TD
    A[Investor intent] --> B{Authenticated?}
    B -->|No| C[Register or login]
    B -->|Yes| D[Load investor context]
    C --> D
    D --> E{Country and tax context valid?}
    E -->|No| F[Capture or correct residency]
    E -->|Review required| G[Compliance review]
    E -->|Yes| H{KYC and AML approved?}
    F --> E
    G -->|Approved| H
    G -->|Rejected| R[Restricted account]
    H -->|No| I[KYC and document verification]
    H -->|Yes| J{Bank context valid?}
    I -->|Approved| J
    I -->|Retry| I
    I -->|Escalated| G
    J -->|No| K[Verify NRE or NRO account]
    J -->|Yes| L[Choose product action]
    K -->|Approved| L
    K -->|Failure| S[Bank recovery]
    L --> M{Action type}
    M -->|Invest| N[Fund discovery and order]
    M -->|Redeem| O[Redemption and tax preview]
    M -->|Report| P[Generate report]
    N --> Q[Payment and execution]
    O --> Q
    Q --> T[Order tracking and settlement]
    T --> U[Portfolio, tax and notification updates]
    P --> U
    U --> V[Completed evidence]
    Q -->|Pending or failed| W[Exception and recovery]
    W --> T
~~~

~~~mermaid
---
title: Task Flow Diagram
---
flowchart TD
    A[Start task] --> B[Identify task domain]
    B --> C{Requires authentication?}
    C -->|Yes| D[Authenticate and step-up if required]
    C -->|No| E[Open public guidance]
    D --> F[Load permissions and current state]
    F --> G{Allowed and actionable?}
    G -->|No| H[Explain restriction or missing prerequisite]
    G -->|Yes| I[Collect required input]
    I --> J[Validate input and dependencies]
    J -->|Invalid| K[Show correction requirement]
    K --> I
    J -->|Pending| L[Create pending state and SLA]
    J -->|Valid| M[Confirm consequential action]
    M --> N[Execute command]
    N --> O{Authoritative outcome?}
    O -->|Yes| P[Record evidence and notify]
    O -->|No| L
    O -->|Failure| Q[Create exception and recovery task]
    Q --> R[Human or automated recovery]
    R --> O
    P --> S[Complete task]
~~~

~~~mermaid
---
title: Decision Tree
---
flowchart TD
    A[Investor action requested] --> B{Country approved?}
    B -->|No| C[Restricted: explain country limitation]
    B -->|Review| D[Compliance review]
    B -->|Yes| E{Tax residency captured?}
    E -->|No| F[Collect FATCA/CRS context]
    E -->|Yes| G{KYC and AML approved?}
    F --> E
    D -->|Approved| G
    D -->|Rejected| C
    G -->|No| H[KYC recovery or EDD]
    G -->|Yes| I{Bank and account compatible?}
    H -->|Approved| I
    H -->|Rejected| C
    I -->|No| J[Select or verify another account]
    I -->|Yes| K{Product eligible?}
    J --> I
    K -->|No| L[Explain product restriction]
    K -->|Yes| M{Action type}
    M -->|Investment| N{Risk and disclosure acknowledged?}
    M -->|Redemption| O{Tax and payout context available?}
    M -->|Report| P{Source data complete?}
    N -->|No| Q[Education or exit]
    N -->|Yes| R[Authorize investment]
    O -->|No| S[Tax or Finance review]
    O -->|Yes| T[Authorize redemption]
    P -->|No| U[Reconcile or request evidence]
    P -->|Yes| V[Generate report]
~~~

~~~mermaid
---
title: State Transition Diagram
---
stateDiagram-v2
    [*] --> Loading
    Loading --> Empty: no data
    Loading --> Verification: evidence required
    Loading --> Pending: external or human wait
    Loading --> Failure: request error
    Loading --> Success: read completed
    Verification --> Approved: evidence accepted
    Verification --> Rejected: evidence invalid
    Verification --> Retry: correctable error
    Verification --> Escalated: ambiguity or risk
    Pending --> Completed: authoritative confirmation
    Pending --> Failure: definitive failure
    Pending --> Escalated: SLA breach
    Pending --> Expired: validity window ended
    Retry --> Loading: safe retry
    Failure --> Retry: recoverable
    Failure --> Escalated: material or unresolved
    Approved --> Completed: action finalized
    Approved --> Expired: validity ended
    Approved --> Suspended: risk, incident or policy hold
    Suspended --> Verification: review required
    Suspended --> Approved: hold removed
    Suspended --> Rejected: hold confirmed
    Expired --> Verification: renewal or re-verification
    Escalated --> Approved: human approval
    Escalated --> Rejected: human rejection
    Escalated --> Suspended: controlled hold
    Completed --> [*]
    Rejected --> [*]
    Empty --> [*]
~~~

~~~mermaid
---
title: Authentication Flow
---
sequenceDiagram
    autonumber
    actor Investor
    participant Client as App or Web
    participant Identity as Identity Service
    participant OTP as OTP Provider
    participant Risk as Device Risk
    participant Audit as Audit Service

    Investor->>Client: Enter identifier
    Client->>Identity: Start authentication
    Identity->>OTP: Request one-time factor
    OTP-->>Investor: Deliver factor
    Investor->>Client: Submit factor
    Client->>Identity: Validate factor
    Identity->>Risk: Evaluate device and session
    alt Approved
        Risk-->>Identity: Safe session
        Identity->>Audit: Record authentication
        Identity-->>Client: Session and context
        Client-->>Investor: Authenticated state
    else Step-up required
        Risk-->>Identity: Require additional verification
        Identity->>OTP: Request step-up factor
        OTP-->>Investor: Deliver step-up factor
    else Failed or suspicious
        Identity->>Audit: Record failure or hold
        Identity-->>Client: Retry, locked or support state
        Client-->>Investor: Safe recovery guidance
    end
~~~

~~~mermaid
---
title: KYC Flow
---
flowchart TD
    A[KYC start] --> B[Fetch CKYC]
    B -->|Compliant| C[Review identity and consent]
    B -->|Missing or non-compliant| D[Collect passport, PAN and address evidence]
    D --> E[Document quality and OCR]
    E -->|Pass| F[Liveness and video/IPV]
    E -->|Fail| G[Request corrected evidence]
    G --> D
    C --> H[FATCA and CRS declaration]
    F --> H
    H --> I[AML, sanctions, PEP and adverse media screening]
    I -->|Clear| J[Compliance decision]
    I -->|Potential match| K[EDD review]
    J -->|Approved| L[KYC completed]
    J -->|Rejected| M[Restricted and explain safe next step]
    K -->|Approved| L
    K -->|Rejected| M
    K -->|Pending| N[Escalated case and SLA]
~~~

~~~mermaid
---
title: Investment Journey
---
flowchart LR
    A[Invest intent] --> B[Eligible fund discovery]
    B --> C[Fund details and comparison]
    C --> D[Select investment type]
    D --> E[Select verified NRE or NRO account]
    E --> F[Review risk, cost, cut-off and disclosure]
    F --> G[Confirm order]
    G --> H[Authorize payment]
    H --> I{Payment outcome}
    I -->|Success| J[Submit execution order]
    I -->|Pending| K[Payment reconciliation]
    I -->|Failure| L[Safe retry or support]
    J --> M{Execution outcome}
    M -->|Accepted| N[Allotment and portfolio update]
    M -->|Pending| O[Order tracking]
    M -->|Rejected| P[Refund or correction]
    N --> Q[Receipt, notification and evidence]
    O --> M
    P --> Q
~~~

~~~mermaid
---
title: Redemption Journey
---
flowchart TD
    A[Redemption intent] --> B[Select holding and tax year]
    B --> C[Select amount or units]
    C --> D[Select compatible payout account]
    D --> E[Load cost basis, TDS and DTAA context]
    E --> F[Calculate estimate and repatriation context]
    F --> G{Evidence and rules sufficient?}
    G -->|No| H[Tax or Compliance review]
    G -->|Yes| I[Review timing, estimate and forms]
    H -->|Approved| I
    H -->|Not approved| J[Standard treatment or specialist path]
    I --> K[Confirm and authenticate]
    K --> L[Submit redemption]
    L --> M[Track settlement and payout]
    M --> N[Update holding, tax and repatriation ledger]
    L -->|Failure| O[Reconcile and recover]
    O --> M
~~~

~~~mermaid
---
title: Error Recovery Flow
---
flowchart TD
    A[Error detected] --> B[Classify severity and domain]
    B --> C{Safe automatic retry?}
    C -->|Yes| D[Idempotent retry]
    D --> E{Resolved?}
    E -->|Yes| F[Record correction and notify]
    E -->|No| G[Create exception case]
    C -->|No| G
    G --> H[Assign owner and SLA]
    H --> I{Customer action required?}
    I -->|Yes| J[Request specific correction]
    I -->|No| K[Backstage/vendor recovery]
    J --> L[Validate correction]
    L -->|Valid| M[Resume original state]
    L -->|Invalid| J
    K --> N{Resolved within SLA?}
    N -->|Yes| F
    N -->|No| O[Escalate and communicate breach]
    O --> P[Human decision or controlled refund]
    P --> F
~~~

~~~mermaid
---
title: Service Recovery Flow
---
sequenceDiagram
    autonumber
    actor Investor
    participant Support
    participant Case as Case Service
    participant Owner as Domain Owner
    participant Vendor
    participant Audit

    Investor->>Support: Report issue or request help
    Support->>Case: Authenticate and create case
    Case->>Case: Classify severity, domain and SLA
    Case->>Owner: Assign case with context package
    Owner->>Vendor: Investigate or reconcile external state
    Vendor-->>Owner: Status, evidence or failure
    alt Resolved
        Owner->>Case: Record resolution and evidence
        Case->>Audit: Log owner, state and closure
        Case-->>Support: Resolution and approved response
        Support-->>Investor: Explain outcome and next step
    else Needs specialist review
        Owner->>Case: Escalate to Compliance, Finance or Tax
        Case-->>Investor: Send owner and next-update time
    else SLA breached
        Case->>Audit: Record breach
        Case-->>Support: Escalation and service recovery action
        Support-->>Investor: Communicate delay and revised commitment
    end
~~~

~~~mermaid
---
title: Notification Flow
---
flowchart TD
    A[Domain event] --> B[Classify purpose and severity]
    B --> C[Resolve recipient and permission]
    C --> D[Check channel consent]
    D --> E[Select approved template]
    E --> F[Render safe content]
    F --> G[Send to provider]
    G --> H{Delivery result}
    H -->|Delivered| I[Record delivery evidence]
    H -->|Failed| J{Critical notification?}
    J -->|No| K[Retry or suppress]
    J -->|Yes| L[Fallback channel and support task]
    K --> I
    L --> I
    I --> M[Update in-app notification state]
~~~

~~~mermaid
---
title: Backend Interaction Flow
---
flowchart LR
    A[Client command] --> B[API gateway]
    B --> C[Identity and authorization]
    C --> D[Domain service]
    D --> E[Policy and eligibility]
    E --> F[Workflow orchestrator]
    F --> G[External vendor adapter]
    G --> H[Vendor API]
    H --> I[Callback or polling]
    I --> J[Event inbox]
    J --> K[State transition]
    K --> L[Operational ledger]
    K --> M[Customer read model]
    K --> N[Notification service]
    K --> O[Audit service]
    K --> P[Analytics pipeline]
    J --> Q[Reconciliation queue]
    Q --> R[Human operations]
    R --> K
~~~

~~~mermaid
---
title: Human Intervention Flow
---
flowchart TD
    A[Automated or customer event] --> B{Risk, ambiguity or SLA breach?}
    B -->|No| C[Continue automated path]
    B -->|Yes| D[Create owned case]
    D --> E{Domain}
    E -->|Identity or KYC| F[KYC Operations]
    E -->|AML, country or policy| G[Compliance]
    E -->|Payment or payout| H[Finance]
    E -->|Order or reconciliation| I[Operations]
    E -->|Tax or DTAA| J[Tax specialist]
    E -->|Relationship or high-value service| K[RM]
    E -->|Customer communication| L[Support]
    F --> M[Review evidence]
    G --> M
    H --> M
    I --> M
    J --> M
    K --> M
    L --> M
    M --> N{Decision}
    N -->|Approve| O[Resume service state]
    N -->|Reject| P[Restrict and explain]
    N -->|Need evidence| Q[Request customer action]
    N -->|Need specialist| R[Consent-based handoff]
    O --> S[Audit and notify]
    P --> S
    Q --> S
    R --> S
~~~

~~~mermaid
---
title: System Sequence Diagram
---
sequenceDiagram
    autonumber
    actor Investor
    participant Client as App or Web
    participant API as API Gateway
    participant Auth as Identity and Authorization
    participant Policy as Eligibility Policy
    participant Order as Order Service
    participant Pay as Payment Gateway
    participant Exec as Execution Platform
    participant RTA as CAMS or KFintech
    participant Case as Case Service
    participant Notify as Notification Service
    participant Audit as Audit Service

    Investor->>Client: Request investment action
    Client->>API: Submit command with correlation ID
    API->>Auth: Validate session and permission
    Auth-->>API: Authorized context
    API->>Policy: Validate country, KYC, account and scheme
    Policy-->>API: Approved eligibility decision
    API->>Order: Create idempotent order
    Order->>Audit: Record order creation and policy version
    Order->>Pay: Initiate authorized payment
    Pay-->>Order: Payment pending or success callback
    alt Payment success
        Order->>Exec: Submit execution order
        Exec-->>Order: Accepted, pending or rejected
        Order->>Notify: Send order state
        Exec->>RTA: Allotment and holding update
        RTA-->>Order: Allotment or reconciliation data
        Order->>Audit: Record final state and evidence
        Order-->>Client: Customer-safe timeline
    else Payment pending or failed
        Order->>Case: Create reconciliation exception
        Case->>Notify: Send owner and SLA
        Case->>Audit: Record exception
        Notify-->>Investor: Recovery status
    end
~~~

