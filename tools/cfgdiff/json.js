const rhs = {
    config: {
        'webfilter profile': {
            edit: {
                default: {
                    set: {
                        comment: 'M Default Web Filtering.',
                        options: [
                            'activexfilter',
                            'cookiefilter',
                            'javafilter',
                            'block-invalid-url',
                            'add-one',
                            '"add two"'
                        ]
                    },
                    config: {
                        override: {
                            set: {
                                'ovrd-dur': '1d2h3m',
                                profile: 'monitor-all'
                            }
                        },
                        web: {
                            set: {
                                'bword-table': '1'
                            }
                        },
                        'ftgd-wf': {
                            set: {
                                options: ['error-allow',
                                    'http-err-detail',
                                    'rate-server-ip',
                                    'redir-block'
                                ],
                                ovrd: ['75', 'g05']
                            },
                            config: {
                                filters: {
                                    edit: {
                                        '1': {
                                            set: {
                                                category: '2'
                                            }
                                        },
                                        '2': {
                                            set: {
                                                category: '7'
                                            }
                                        }
                                    }
                                },
                                quota: {
                                    edit: {
                                        '1': {
                                            set: {
                                                category: 'g02'
                                            }
                                        },
                                        '2': {
                                            set: {
                                                duration: '17s'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = rhs;