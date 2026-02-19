## SCENARIO_01
- Problem Summary:В приложении должно существовать одно глобальное хранилище конфигурации, к которому могут обращаться все модули.
- Selected Pattern Family: Creational
- Selected Specific Pattern: Singleton
- Why This Family: Проблема связана с контролем создания объекта. Нужно гарантировать существование только одного экземпляра.
- Why This Pattern: Singleton обеспечивает наличие одного экземпляра класса и глобальную точку доступа к нему.
- Alternative Considered: Factory Method — но он создаёт разные экземпляры, а нам нужен строго один.

## SCENARIO_02
- Problem Summary: Нужно адаптировать старый API платёжного шлюза к новому интерфейсу.
- Selected Pattern Family: Structural
- Selected Specific Pattern: Adapter
- Why This Family: Проблема связана с соединением несовместимых интерфейсов.
- Why This Pattern: Adapter преобразует интерфейс одного класса в интерфейс, ожидаемый клиентом.
- Alternative Considered: Facade — но он скрывает сложность, а не изменяет интерфейс.

## SCENARIO_03
- Problem Summary: Несколько компонентов должны автоматически реагировать на событие (например, сдачу домашнего задания).
- Selected Pattern Family: Behavioral
- Selected Specific Pattern: Observer
- Why This Family: Проблема касается взаимодействия и уведомления объектов.
- Why This Pattern: Observer позволяет подписчикам получать уведомления при изменении состояния.
- Alternative Considered: Mediator — но здесь важна подписка и уведомление, а не централизованная координация.

## SCENARIO_04
- Problem Summary: Процесс построения отчёта одинаковый, но формат вывода разный
- Selected Pattern Family: Creational
- Selected Specific Pattern: Builder
- Why This Family: Проблема связана с созданием сложного объекта с одинаковым процессом, но разным представлением.
- Why This Pattern: Builder отделяет процесс построения от представления.
- Alternative Considered: Factory — но Factory не управляет пошаговым процессом сборки.

## SCENARIO_05
- Problem Summary:Нужно реализовать Undo/Redo для действий пользователя.
- Selected Pattern Family: Behavioral
- Selected Specific Pattern: Command
- Why This Family: Проблема связана с выполнением действий и управлением историей.
- Why This Pattern: Command инкапсулирует действие в объект и позволяет выполнять, отменять и повторять его.
- Alternative Considered: Strategy — но Strategy выбирает алгоритм, а не хранит историю действий.

## SCENARIO_06
- Problem Summary: Нужно создать 50 000 частиц, но сократить использование памяти.
- Selected Pattern Family: Structural
- Selected Specific Pattern: Flyweight
- Why This Family: Проблема связана с композицией и разделением состояния.
- Why This Pattern: Flyweight позволяет разделить общее (intrinsic) состояние и уникальное (extrinsic), экономя память.
- Alternative Considered: Prototype — но он клонирует объекты, а не разделяет состояние.