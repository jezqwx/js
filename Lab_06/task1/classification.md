## Snippet_01
- Pattern Family: Creational
- Specific Pattern Name: Singleton
- Evidence: - if ( DatabaseConnection . _instance ) { return DatabaseConnection . _instance ;}
            -static getInstance () {... return DatabaseConnection . _instance ;}
- Book Reference:  
- Reasoning:

## Snippet_02
- Pattern Family: Behavioral
- Specific Pattern Name: Observer
- Evidence: - subscribe ( event , callback ) {... this . _subscribers [ event ]. push ( callback ) ;}
- Book Reference:  
- Reasoning:

## Snippet_03
- Pattern Family: Structural
- Specific Pattern Name: Facade
- Evidence: - class UserSession {... this . _auth = new AuthService () ; this . _repo = new UserRepository () ; this . _logger = new AuditLogger () ;}
- Book Reference:  
- Reasoning:

## Snippet_04
- Pattern Family: Creational
- Specific Pattern Name: Factory Method
- Evidence: - function createNotifier ( type ) {16 switch ( type ) {... return new SMSNotifier () ; ...}}
            - const notifier = createNotifier ('telegram ') ;
- Book Reference:  
- Reasoning:

## Snippet_05
- Pattern Family: Structural
- Specific Pattern Name: Decorator
- Evidence: - withTime = new TimestampLogger ( base ) 
            - withBoth = new SeverityLogger ( withTime , 'ERROR ') ;
- Book Reference:  
- Reasoning:

## Snippet_06
- Pattern Family: Creational
- Specific Pattern Name: Prototype
- Evidence: - const car = vehiclePrototype . clone () ;
            - const truck = vehiclePrototype . clone () ;
- Book Reference: 
- Reasoning:

## Snippet_07
- Pattern Family: Behavioral
- Specific Pattern Name: Chain of Responsiblity
- Evidence: - constructor () { this . text = ''; }
- Book Reference:  
- Reasoning:

## Snippet_08
- Pattern Family: Behavioral
- Specific Pattern Name: Command
- Evidence: - history . run (new WriteCommand ( editor , 'Hello ') ) 
            - history . undo () ;console . log ( `[ SNIPPET_08 ] After undo :)
- Book Reference:  
- Reasoning:

## Snippet_09
- Pattern Family: Structural
- Specific Pattern Name: Flyweight
- Evidence: -({ Object . keys ( TreeTypeFactory . _types ) . length } `) ;
            - if ( target ) target . receive ( from . name , message ) ;
- Book Reference:  
- Reasoning:

## Snippet_10
- Pattern Family: Behavioral
- Specific Pattern Name: Mediator
- Evidence: - class ChatRoom
- Book Reference:  
- Reasoning: