<?php
namespace Craft;

return [
    'endpoints' => [
        'program.json' => [
            'elementType' => ElementType::Entry,
            'criteria' => ['section' => 'program'],
            'transformer' => function(EntryModel $entry) {
                return [
                    'title' => $entry->title,
                    'url' => $entry->url,
                    'jsonUrl' => UrlHelper::getUrl("program/{$entry->id}.json")
                ];
            },
        ],
        'program/<entryId:\d+>.json' => function($entryId) {
            return [
                'elementType' => ElementType::Entry,
                'criteria' => ['id' => $entryId],
                'first' => true,
                'transformer' => function(EntryModel $entry) {
                    return [
                        'title' => $entry->title,
                        'url' => $entry->url,
                    ];
                },
            ];
        },

        'institution.json' => [
            'elementType' => ElementType::Entry,
            'criteria' => ['section' => 'program', 'type' =>'institution'],
            'transformer' => function(EntryModel $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'url' => $entry->url,
                    'jsonUrl' => UrlHelper::getUrl("institution/{$entry->id}.json")
                ];
            },
        ],
        'themes.json' => [
            'elementType' => ElementType::Category,
            'criteria' => ['group' => 'themes'],
            'transformer' => function(CategoryModel $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id
                ];
            },
        ],
        'events.json' => [
            'elementType' => ElementType::Category,
            'criteria' => ['group' => 'kindOfEvent'],
            'transformer' => function(CategoryModel $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id
                ];
            },
        ],
    ]
];